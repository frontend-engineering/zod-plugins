import { z } from 'zod';
export declare const buildRollupConfigInputSchema: z.ZodObject<{
    bundleInput: z.ZodString;
    bundleFile: z.ZodString;
}, "strip", z.ZodTypeAny, {
    bundleInput?: string;
    bundleFile?: string;
}, {
    bundleInput?: string;
    bundleFile?: string;
}>;
export declare const devExecutorSchema: z.ZodObject<{
    main: z.ZodOptional<z.ZodString>;
    tsConfig: z.ZodOptional<z.ZodString>;
    watch: z.ZodDefault<z.ZodBoolean>;
    outputPath: z.ZodString;
    yalc: z.ZodDefault<z.ZodBoolean>;
    bundleDts: z.ZodDefault<z.ZodBoolean>;
    assets: z.ZodDefault<z.ZodArray<z.ZodAny, "many">>;
}, "strip", z.ZodTypeAny, {
    main?: string;
    tsConfig?: string;
    watch?: boolean;
    outputPath?: string;
    yalc?: boolean;
    bundleDts?: boolean;
    assets?: any[];
}, {
    main?: string;
    tsConfig?: string;
    watch?: boolean;
    outputPath?: string;
    yalc?: boolean;
    bundleDts?: boolean;
    assets?: any[];
}>;
