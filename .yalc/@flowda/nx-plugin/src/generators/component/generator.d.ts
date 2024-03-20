import { StringChange, Tree } from '@nrwl/devkit';
import { componentGeneratorSchema } from './schema';
import { z } from 'zod';
import type * as ts from 'typescript';
export default function (host: Tree, options: z.infer<typeof componentGeneratorSchema>): Promise<void>;
export declare function addBind(source: ts.SourceFile, statement: string): StringChange[];
