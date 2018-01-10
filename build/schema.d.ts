import { GraphQLSchema, ExecutionResult, GraphQLResolveInfo } from 'graphql';
import { StrongObjectType } from './object';
/**
 * Creates a strong, type-safe, GraphQL schema that forces correctness on
 * execution.
 */
export declare function createSchema<TValue>(config: StrongSchemaConfig<TValue, {}>): StrongSchema<TValue, {}>;
export declare function createSchema<TValue, TContext>(config: StrongSchemaConfig<TValue, TContext>): StrongSchema<TValue, TContext>;
/**
 * The configuration for a strong GraphQL schema.
 */
export interface StrongSchemaConfig<TValue, TContext> {
    readonly query: StrongObjectType<TValue, TContext>;
    readonly mutation?: StrongObjectType<TValue, TContext>;
    /**
     * Runs only once at the beginning of an execution for this schema.
     */
    onExecute?(value: TValue, context: TContext, info: GraphQLResolveInfo): void | Promise<void>;
}
/**
 * The strong GraphQL schema represents a type-safe GraphQL schema that forces
 * type correctness on execution with the `execute` method.
 */
export declare class StrongSchema<TValue, TContext> extends GraphQLSchema {
    constructor(config: StrongSchemaConfig<TValue, TContext>);
    /**
     * A type-safe execution function for our strong GraphQL schema. With this
     * function you will be forced to provide values and contexts of the correct
     * types.
     */
    execute(query: string, value: TValue, context: TContext, variables?: {
        [key: string]: any;
    }, operation?: string): Promise<ExecutionResult>;
}
