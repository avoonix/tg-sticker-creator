export const defaultScript = `
// after you stop typing, the script gets evaluated in the main thread 
// using exec, so don't paste any code you don't trust in here

animation
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

// TODO: write your script

// everything you need to create animations with tg-sticker-creator is available here:
// import { create, enums, easings } from "tg-sticker-creator";
// const animation = create.sticker()

// but beware, you can't import additional stuff or use typescript syntax
`;
