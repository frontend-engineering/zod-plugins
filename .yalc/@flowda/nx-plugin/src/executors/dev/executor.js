"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRollupConfig = void 0;
const tslib_1 = require("tslib");
const devkit_1 = require("@nrwl/devkit");
const zod_def_1 = require("./zod-def");
const rollup = require("rollup");
const rollup_plugin_dts_1 = require("rollup-plugin-dts");
const path = require("path");
const tsc_impl_1 = require("@nrwl/js/src/executors/tsc/tsc.impl");
const child_process_1 = require("child_process");
const consola_1 = require("consola");
const fs = require("fs-extra");
function buildRollupConfig(input) {
    return {
        input: input.bundleInput,
        output: [
            {
                file: input.bundleFile,
                format: 'es',
            },
        ],
        plugins: [(0, rollup_plugin_dts_1.default)({})],
    };
}
exports.buildRollupConfig = buildRollupConfig;
function devExecutor(_options, context) {
    return tslib_1.__asyncGenerator(this, arguments, function* devExecutor_1() {
        var _a, e_1, _b, _c;
        const options = zod_def_1.devExecutorSchema.parse(_options);
        const tscGenerator = (0, tsc_impl_1.tscExecutor)({
            buildableProjectDepsInPackageJsonType: 'peerDependencies',
            generateLockfile: false,
            outputPath: options.outputPath,
            main: options.main || `libs/${context.projectName}/src/index.ts`,
            tsConfig: options.tsConfig || `libs/${context.projectName}/tsconfig.lib.json`,
            assets: options.assets,
            watch: options.watch,
            clean: true,
            transformers: [],
            updateBuildableProjectDepsInPackageJson: true,
            externalBuildTargets: ['build'],
        }, context);
        try {
            for (var _d = true, tscGenerator_1 = tslib_1.__asyncValues(tscGenerator), tscGenerator_1_1; tscGenerator_1_1 = yield tslib_1.__await(tscGenerator_1.next()), _a = tscGenerator_1_1.done, !_a; _d = true) {
                _c = tscGenerator_1_1.value;
                _d = false;
                const output = _c;
                yield yield tslib_1.__await(output);
                if (options.bundleDts) {
                    const rollupOptions = buildRollupConfig({
                        bundleInput: path.join(options.outputPath, `src/index.d.ts`),
                        bundleFile: path.join(options.outputPath, `index.bundle.d.ts`),
                    });
                    try {
                        consola_1.default.start(`Bundling ${context.projectName} .d.ts...`);
                        const bundle = yield tslib_1.__await(rollup.rollup(rollupOptions));
                        yield tslib_1.__await(bundle.write(rollupOptions.output[0]));
                        consola_1.default.success(`Bundle done.`);
                    }
                    catch (e) {
                        if (e instanceof Error) {
                            consola_1.default.error(`Bundle error ${e.message}`);
                        }
                        else {
                            consola_1.default.error(e);
                        }
                    }
                }
                const packageJsonPath = path.join(options.outputPath, 'package.json');
                const packageJson = (0, devkit_1.readJsonFile)(packageJsonPath);
                if (options.bundleDts) {
                    packageJson.types = './index.bundle.d.ts';
                    (0, devkit_1.writeJsonFile)(`${options.outputPath}/package.json`, packageJson);
                    consola_1.default.info('  update package.json#types: ./index.bundle.d.ts');
                }
                else {
                    if (options.yalc) {
                        delete packageJson.types;
                        (0, devkit_1.writeJsonFile)(`${options.outputPath}/package.json`, packageJson);
                        consola_1.default.info('  delete package.json#types');
                    }
                }
                if (options.yalc) {
                    consola_1.default.start(`yalc publish ${context.projectName} ...`);
                    fs.writeFileSync(path.join(options.outputPath, '.yalcignore'), `*.js.map
src/**/*.d.ts
src/**/__fixtures__/**/*
src/**/__tests__/**/*
`);
                    (0, child_process_1.execSync)(`yalc publish --push --changed`, {
                        cwd: options.outputPath,
                        stdio: 'inherit',
                    });
                    consola_1.default.success('yalc publish done.');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (!_d && !_a && (_b = tscGenerator_1.return)) yield tslib_1.__await(_b.call(tscGenerator_1));
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
exports.default = devExecutor;
//# sourceMappingURL=executor.js.map