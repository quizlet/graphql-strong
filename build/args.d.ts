/**
 * Types used for arguments that are shared by objects, interfaces, directives
 * and other GraphQL constructs that use arguments.
 */
import { GraphQLFieldConfigArgumentMap } from 'graphql';
import { StrongInputType } from './type';
/**
 * A type which represents the GraphQL type definition of the argument
 * TypeScript type provided.
 */
export declare type StrongArgsConfig<TArgs> = {
    [TArg in keyof TArgs]: StrongArgConfig<TArgs[TArg]>;
};
/**
 * A type which represents a single argument configuration.
 */
export declare type StrongArgConfig<TValue> = {
    readonly type: StrongInputType<TValue>;
    readonly defaultValue?: TValue;
    readonly description?: string | undefined;
};
/**
 * Turns a strong argument config into a weak argument map that can be fed into
 * GraphQL.js.
 */
export declare function getWeakArgsMap(args: StrongArgsConfig<any>): GraphQLFieldConfigArgumentMap;
