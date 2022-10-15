import { create } from "tg-sticker-creator";
import { createFilter } from "./createFilter";
import { createRandom } from "./random";

export const speedlines = (id: string) =>
  createFilter({
    mandatory: false,
    niceness: -1,
    id,
    displayName: "Speedlines",
    inputs: {
      base: {
        type: "color",
        default: "#ffffffff",
        displayName: "Base Color",
      },
      speed: {
        type: "number",
        displayName: "Speed",
        default: 3,
        min: 1,
        max: 5, // TODO: test if these min/max are good enough
      },
    },
    async apply(sticker, inputs) {
      // const inputs: InputType = new InputBuilder(params);
      const r = createRandom("aaa");
      const random = Array.from({ length: 3 * 60 }).map(() => r());

      const getRandom = (i: number) =>
        random[(random.length + i) % random.length];

      const group = create.group();

      for (let i = 3 * 60 + 60; i >= -60; --i) {
        group.addShapeBack(
          create
            .group()
            .addShapeBack(
              create
                .group()
                .addShapeBack(
                  create.path().setVertices(
                    // TODO: simplify path creation boilerplate
                    create.animatablePath(
                      create
                        .pathValue()
                        .addSegment([256, 0], [0, 0], [0, 0])
                        .addSegment([256 - 40, 400], [0, 0], [0, 0]) // TODO: remove [0,0]
                        .addSegment([256 + 40, 400], [0, 0], [0, 0]),
                    ),
                  ),
                )
                .addShapeBack(create.fill().setColor(create.color(inputs.base)))
                .addShapeBack(
                  create
                    .transform()
                    .setOpacity(
                      create
                        .value(0)
                        .toAnimated(1 * i - 5)
                        .addKeyframe(1 * i, 100)
                        .addKeyframe(1 * i + 30 * (1 / inputs.speed), 0),
                    )
                    .setPosition(
                      create
                        .value(0, 380 + 50 * getRandom(i))
                        .toAnimated(1 * i)
                        .addKeyframe(
                          1 * i + 30 * (1 / inputs.speed),
                          [0, 500],
                          "ease",
                        ),
                    ),
                ),
            )
            .addShapeBack(
              create
                .transform()
                .setPosition(create.value(256, 256))
                .setAnchor(create.value([256, 256]))
                .setRotation(create.value(getRandom(i) * 360)),
            ),
        );
      }

      sticker.addLayerFront(
        create
          .shapeLayer()
          .addShapeBack(group.addShapeBack(create.transform())),
      );

      return sticker;
    },
  });
