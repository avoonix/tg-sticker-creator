import "dotenv/config";
import express from "express";
import PQueue from "p-queue";
import { chromium } from "playwright-chromium";
import { Stream } from "stream";
import { File, Web3Storage } from "web3.storage";

const second = 1000;
const minute = 60 * second;

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
      // timeout: 6000000000,
      throwOnTimeout: true,
      autoStart: true,
    });
  // for await (const item of client.list()) {
  //   console.log("upload", item.name);
  // }

  if (queue.size > 5) return res.status(429).end();

  queue.add(async () => {
  const start = process.hrtime();

    console.log("start")
    // Start the browser with the AWS Lambda wrapper (chrome-aws-lambda)
    const browser = await chromium.launch({
      headless: false,
      chromiumSandbox: false,
    });
    // // Set the s-maxage property which caches the images then on the Vercel edge
    // res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
    // res.setHeader('Content-Type', 'image/png')
    // write the image to the response with the specified Content-Type
    // res.end(data)

    console.log("page")
    const page = await browser.newPage({});
    page.setDefaultTimeout(0);

  page.on("console", (msg) => console.log("console message:", msg.text()));

  const sticker  = "popping";
  const settingId = "c954445e-710f-47a3-9021-84a07c0b9c3a";


  await page.goto(`https://harmonious-paletas-16a775.netlify.app/edit/${sticker}/headless?id=${encodeURIComponent(String(settingId))}`);

  // const [download] = await Promise.all([
  //   page.waitForEvent("download"),
  //   page.locator("text=Export as MP4").click(),
  // ]);
  const download = await page.waitForEvent("download");

  const result = (await download.createReadStream());
    if (!result) throw new Error("no result");
    // res.setHeader("Content-Type", "video/webm");
    //   res.end(result);
    // result.pipe(res, { end: true });

    const durationInSeconds = getDurationInMilliseconds(start) / 1000;
    console.log(`start until the buffer is ready: ${durationInSeconds} s`);
    const cid = await client.put(
      [
        new File([await streamToBuffer(result)], "video.mp4", {
          type: "video/mp4",
        }),
      ],
      { name: "sticker test" }
    );
    console.log("close")
    await browser.close();
    console.log(cid);
  });

  res.json({ size: queue.size });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
