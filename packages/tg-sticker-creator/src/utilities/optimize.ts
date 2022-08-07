import { Lottie } from "../core/internal";
import { defaults } from "./utilities";

export interface OptimizeFilesizeOptions {
    /**
     * default: true
     */
    removeAnimationName: boolean;

    /**
     * default: true
     */
    removeLayerNames: boolean;

    /**
     * default: true
     */
    removeShapeNames: boolean;

    /**
     * default: true
     */
    removeHiddenShapes: boolean;

    /**
     * `hidden = false` behaves the same as `hidden = undefined`, but the latter uses up less space if encoded as JSON
     * 
     * default: true
     */
    removeDefaultValues: boolean;
}

const defaultConfig: OptimizeFilesizeOptions = {
    removeAnimationName: true,
    removeLayerNames: true,
    removeHiddenShapes: true,
    removeDefaultValues: true,
    removeShapeNames: true,
}

export const optimizeFilesize = (sticker: Lottie, options: Partial<OptimizeFilesizeOptions> = {}) => {
    const config = defaults(options, defaultConfig);

    if (config.removeAnimationName) {
        sticker.name = undefined;
    }

    if (config.removeLayerNames || config.removeHiddenShapes || config.removeDefaultValues) {
        sticker.eachChildLayer((layer) => {
            if (config.removeLayerNames) {
                layer.name = undefined;
            }
            if (config.removeHiddenShapes && layer.is("ShapeLayer")) {
                layer.shapes = layer.shapes.filter((s) => !s.hidden);
            }
            if (config.removeDefaultValues) {
                if (layer.hidden === false) layer.setHidden(undefined);
            }
        });
    }

    if (config.removeShapeNames || config.removeHiddenShapes || config.removeDefaultValues) {
        sticker.eachChildShape((shape) => {
            if (config.removeShapeNames) {
                shape.name = undefined;
            }
            if (config.removeHiddenShapes && shape.is("GroupShape")) {
                shape.shapes = shape.shapes.filter((s) => !s.hidden);
            }
            if (config.removeDefaultValues) {
                if (shape.hidden === false) shape.setHidden(undefined);
            }
        });
    }

    return sticker;
}
