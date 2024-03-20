import { type ExecutorContext } from '@nrwl/devkit';
import { buildRollupConfigInputSchema, devExecutorSchema } from './zod-def';
import { z } from 'zod';
import * as rollup from 'rollup';
export declare function buildRollupConfig(input: z.infer<typeof buildRollupConfigInputSchema>): rollup.RollupOptions;
export default function devExecutor(_options: z.infer<typeof devExecutorSchema>, context?: ExecutorContext): AsyncGenerator<import("@nrwl/js/src/utils/typescript/compile-typescript-files").TypescriptCompilationResult, void, unknown>;
