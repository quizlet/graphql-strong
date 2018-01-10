import { ValueNode } from 'graphql';
import { StrongOutputType, StrongInputOutputType } from './type';
/**
 * Creates a GraphQL scalar type.
 *
 * If you just past a `serialize` function with your config you will get an
 * output type. If you pass both a `parseValue` and `parseLiteral` function with
 * your config, you will get an input/output type.
 */
export declare function createScalarType<TInternalValue, TExternalValue>(config: StrongScalarTypeConfigWithoutInput<TInternalValue, TExternalValue>): StrongOutputType<TInternalValue>;
export declare function createScalarType<TInternalValue, TExternalValue>(config: StrongScalarTypeConfigWithInput<TInternalValue, TExternalValue>): StrongInputOutputType<TInternalValue>;
/**
 * A GraphQL scalar type config that does not support input values, only output
 * values.
 */
export declare type StrongScalarTypeConfigWithoutInput<TInternalValue, TExternalValue> = {
    readonly name: string;
    readonly description?: string | undefined;
    readonly serialize: (value: TInternalValue) => TExternalValue;
};
/**
 * A GraphQL scalar type config that does support input values alongside output
 * values.
 */
export declare type StrongScalarTypeConfigWithInput<TInternalValue, TExternalValue> = {
    readonly name: string;
    readonly description?: string | undefined;
    readonly serialize: (value: TInternalValue) => TExternalValue;
    readonly parseValue: (value: TExternalValue) => TInternalValue | null;
    readonly parseLiteral: (ast: ValueNode) => TInternalValue | null;
};
