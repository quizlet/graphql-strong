"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A utility function for creating GraphQL descriptions out of a multiline
 * template string.
 *
 * It trims whitespace from the beginning and end of the string in addition to
 * removing indentation.
 */
function trimDescription(description) {
    return description.replace(/^ +/gm, '').trim();
}
exports.trimDescription = trimDescription;
/**
 * Runs `trimDescription` on all properties named `description` deeply in a
 * config object.
 *
 * Creates a new config object instead of mutating the config object passed in.
 *
 * We only trim descriptions on plain JavaScript objects.
 */
function trimDescriptionsInConfig(config) {
    const nextConfig = {};
    // Iterate through every key in the config object.
    for (const key of Object.keys(config)) {
        const value = config[key];
        // If the value at this key is an object we need to recurse this function.
        if (value !== null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
            nextConfig[key] = trimDescriptionsInConfig(value);
        }
        else if (key === 'description' && typeof value === 'string') {
            nextConfig[key] = trimDescription(value);
        }
        else {
            nextConfig[key] = value;
        }
    }
    return nextConfig;
}
exports.trimDescriptionsInConfig = trimDescriptionsInConfig;
