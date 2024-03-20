"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devExecutorSchema = exports.buildRollupConfigInputSchema = void 0;
const zod_1 = require("zod");
exports.buildRollupConfigInputSchema = zod_1.z.object({
    bundleInput: zod_1.z.string(),
    bundleFile: zod_1.z.string(),
});
exports.devExecutorSchema = zod_1.z.object({
    main: zod_1.z.string().optional(),
    tsConfig: zod_1.z.string().optional(),
    watch: zod_1.z.boolean().default(true),
    outputPath: zod_1.z.string(),
    yalc: zod_1.z.boolean().default(true),
    bundleDts: zod_1.z.boolean().default(true),
    assets: zod_1.z.array(zod_1.z.any()).default([]),
});
//# sourceMappingURL=zod-def.js.map