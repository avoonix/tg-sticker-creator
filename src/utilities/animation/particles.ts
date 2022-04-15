import { create, Easing, GroupShape, Shape } from "../..";

const defaultConfig: ParticleAnimationOptions = {
  decay: 0,
  decayEasing: "ease",
  direction: 0,
  emission: 1,
  emissionEasing: "ease",
  emissionDuration: 0,
  finalEmissionFrame: 180,
  lifetime: 20,
  random: () => Math.random(),
  startFrame: 0,
  velocity: 5,
  xOffset: 0,
  yOffset: 0,
};

/**
 * Exact value or range
 */
export type RandomizableValue =
  | number
  | {
      min: number;
      max: number;
    };

/**
 * Instantiates many shapes
 */
export interface ParticleAnimationOptions {
  random: () => number; // defaults to Math.random; should return value in interval [0,1)
  // gravity: RandomizableValue; // acceleration, can be negative
  emission: RandomizableValue; // number of particles to emit per frame
  emissionEasing: Easing;
  emissionDuration: RandomizableValue; // how long it takes from 0 to 100% opacity after emission
  direction: RandomizableValue; // 0-359 deg
  velocity: RandomizableValue; // initial velocity
  decay: RandomizableValue; // fade out duration, in frames (0 = immediate)
  decayEasing: Easing;
  xOffset: RandomizableValue;
  yOffset: RandomizableValue;
  startFrame: number;
  finalEmissionFrame: number; // frame of final emission; particles may live longer than the final frame (lifetime, decay)
  lifetime: RandomizableValue; // particle lifetime, after which it will start fading out
}

const getNumber = (value: RandomizableValue, random: () => number) => {
  if (typeof value === "number") return value;
  return Math.floor(random() * (value.max - value.min)) + value.min;
};

const instantiateParticle = (particle: Shape, frame: number, config: ParticleAnimationOptions) => {
  const emissionDuration = getNumber(config.emissionDuration, config.random);
  const decayStartFrame = frame + emissionDuration + getNumber(config.lifetime, config.random);
  const decayEndFrame = decayStartFrame + getNumber(config.decay, config.random);
  const angle = (getNumber(config.direction, config.random) * Math.PI) / 180;
  const len = (decayEndFrame - frame) * getNumber(config.velocity, config.random);
  const x = getNumber(config.xOffset, config.random);
  const y = getNumber(config.yOffset, config.random);

  return create
    .group()
    .addShapeBack(particle.clone())
    .addShapeBack(
      create
        .transform()
        .setOpacity(
          create
            .value(0)
            .toAnimated(frame)
            .addKeyframe(frame + emissionDuration + 0.1, 100)
            .addKeyframe(decayStartFrame, 100)
            .addKeyframe(decayEndFrame, 0, config.decayEasing)
        )
        .setPosition(
          create
            .value(x, y)
            .toAnimated(frame)
            .addKeyframe(decayEndFrame, [x + Math.cos(angle) * len, y + Math.sin(angle) * len])
        )
    );
};

/**
 * Uses shape as template for a particle
 * @param shape
 * @param options
 * @returns
 */
export const particles = (shape: Shape, options: Partial<ParticleAnimationOptions>): GroupShape => {
  const group = create.group();
  const config = defaults(options, defaultConfig);
  let frame = getNumber(config.startFrame, config.random);
  const finalFrame = getNumber(config.finalEmissionFrame, config.random);
  do {
    group.addShapeBack(instantiateParticle(shape, frame, config));
    frame += 1 / getNumber(config.emission, config.random);
  } while (frame <= finalFrame);

  return group.addShapeBack(create.transform());
};

const defaults = <T extends {}>(options: Partial<T>, defaultOptions: T) => {
  const result: any = {};
  for (const [key, defaultValue] of Object.entries(defaultOptions)) {
    result[key] = (options as any)[key] ?? defaultValue;
  }
  return result as T;
};
