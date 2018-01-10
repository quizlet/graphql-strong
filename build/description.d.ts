/**
 * A utility function for creating GraphQL descriptions out of a multiline
 * template string.
 *
 * It trims whitespace from the beginning and end of the string in addition to
 * removing indentation.
 */
export declare function trimDescription(description: string): string;
/**
 * Runs `trimDescription` on all properties named `description` deeply in a
 * config object.
 *
 * Creates a new config object instead of mutating the config object passed in.
 *
 * We only trim descriptions on plain JavaScript objects.
 */
export declare function trimDescriptionsInConfig<T extends {
    [key: string]: any;
}>(config: T): T;
