import "dotenv/config";
import express from "express";
import PQueue from "p-queue";
import { chromium } from "playwright-chromium";
import { Stream } from "stream";
import { File, Web3Storage } from "web3.storage";

let queue;

const streamToBuffer = (stream: Stream) =>
  new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream
      .on("data", (chunk) => chunks.push(chunk))
      .once("end", () => resolve(Buffer.concat(chunks)))
      .once("error", reject);
  });

const client = new Web3Storage({ token: process.env.WEB3_TOKEN } as any);

const app = express();
const port = process.env.PORT || 3030;

const getDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} [STARTED]`);
  const start = process.hrtime();

  res.on("finish", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    console.log(
      `${req.method} ${
        req.originalUrl
      } [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`
    );
  });

  res.on("close", () => {
    const durationInMilliseconds = getDurationInMilliseconds(start);
    console.log(
      `${req.method} ${
        req.originalUrl
      } [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`
    );
  });

  next();
});

// TODO: generate on server instead of using playwright
app.get("/", async (req, res) => {
  if (!queue)
    queue = new PQueue({
      concurrency: 1,
      timeout: 60000,
      throwOnTimeout: true,
      autoStart: true,
    });
  // for await (const item of client.list()) {
  //   console.log("upload", item.name);
  // }

  if (queue.size > 5) return res.status(429).end();

  queue.add(async () => {
    const exe = await chromium.executablePath;
    // Start the browser with the AWS Lambda wrapper (chrome-aws-lambda)
    const browser = await chromium.launch({
      headless: true,
      chromiumSandbox: false,
    });
    // // Set the s-maxage property which caches the images then on the Vercel edge
    // res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
    // res.setHeader('Content-Type', 'image/png')
    // write the image to the response with the specified Content-Type
    // res.end(data)

    const page = await browser.newPage();
    // Go to https://tg-sticker-app.vercel.app/
    await page.goto("https://tg-sticker-app.vercel.app/wizard/pet");

    const [download] = await Promise.all([
      // Start waiting for the download
      page.waitForEvent("download", { timeout: 60000 }),
      // Perform the action that initiates download
      // Click text=Export Telegram Sticker
      page.locator("text=Export as video").click(),
    ]);
    const result = await download.createReadStream();
    if (!result) throw new Error("no result");
    // res.setHeader("Content-Type", "video/webm");
    //   res.end(result);
    // result.pipe(res, { end: true });
    const cid = await client.put(
      [
        new File([await streamToBuffer(result)], "video.webm", {
          type: "video/webm",
        }),
      ],
      { name: "sticker test" }
    );
    await browser.close();
    console.log(cid);
  });

  res.json({ size: queue.size });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
