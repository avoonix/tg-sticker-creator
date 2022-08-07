# tg-sticker-creator - A Library for Creating Telegram Stickers

> Alpha Version
 
Works in most browsers and nodejs

[![CI](https://github.com/avoonix/tg-sticker-creator/actions/workflows/main.yml/badge.svg?branch=alpha)](https://github.com/avoonix/tg-sticker-creator/actions/workflows/main.yml)
[![Coverage](https://avoonix.github.io/tg-sticker-creator/coverage/badge.png)](https://avoonix.github.io/tg-sticker-creator/coverage/jest-report.html)

## Full Example ([Try it in the online editor](https://sticker-playground.netlify.app/))

```ts
import pako from "pako";
import download from "downloadjs";

import { create } from "tg-sticker-creator";

const mySticker = create
  .sticker()
  .setFrameRate(30)
  .setFinalFrame(40)
  .addLayerFront(
    create.shapeLayer().addShapeBack(
      create
        .group()
        .addShapeBack(
          create
            .ellipse()
            .setPosition(create.value(156, 156).addKeyframe(10, [356, 156]).addKeyframe(20, [356, 356], "easeInOutCubic").addKeyframe(30, [156, 356]).addKeyframe(40, [156, 156]))
            .setSize(create.value([15, 15]))
        )
        .addShapeBack(create.fill().setColor(create.color("#ffff00")))
        .addShapeBack(create.transform())
    )
  );

download(new Blob([pako.gzip(mySticker.toTgsString({ precision: Infinity }), { level: 9 })]), "sticker.tgs", "application/gzip");
```

## License

[GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html)

## Thanks

I took a few ideas (and code) from these projects:

- https://gitlab.com/mattbas/python-lottie
- https://github.com/airbnb/lottie-android
- https://github.com/airbnb/lottie-web

## Developing

```bash
pnpm i
pnpm test:watch
pnpm commit
```
