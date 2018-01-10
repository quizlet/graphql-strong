"use strict";
/**
 * Types used for arguments that are shared by objects, interfaces, directives
 * and other GraphQL constructs that use arguments.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Turns a strong argument config into a weak argument map that can be fed into
 * GraphQL.js.
 */
function getWeakArgsMap(args) {
    const weakArgs = {};
    for (const argName of Object.keys(args)) {
        const argConfig = args[argName];
        weakArgs[argName] = {
            type: argConfig.type.getWeakInputType(),
            defaultValue: argConfig.defaultValue,
            description: argConfig.description,
        };
    }
    return weakArgs;
}
exports.getWeakArgsMap = getWeakArgsMap;
