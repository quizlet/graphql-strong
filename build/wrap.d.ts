import { GraphQLInputType, GraphQLOutputType } from 'graphql';
import { StrongInputType, StrongOutputType, StrongInputOutputType } from './type';
export declare const IntegerType: StrongInputOutputType<number>;
export declare const FloatType: StrongInputOutputType<number>;
export declare const StringType: StrongInputOutputType<string>;
export declare const BooleanType: StrongInputOutputType<boolean>;
export declare const IDType: StrongInputOutputType<string>;
/**
 * Wraps a `GraphQLType` into a strong GraphQL type with an associated type in
 * the type system. If the `GraphQLType` is a `GraphQLInputType` a
 * `StrongInputType` will be returned, if the `GraphQLType` is a
 * `GraphQLOutputType` a `StrongOutputType` will be returned, and if the
 * `GraphQLType` is both a `GraphQLInputType` and a `GraphQLOutputType` a
 * `StrongInputOutputType` will be returned.
 */
export declare function wrapWeakType<TValue>(type: GraphQLInputType & GraphQLOutputType): StrongInputOutputType<TValue>;
export declare function wrapWeakType<TValue>(type: GraphQLInputType): StrongInputType<TValue>;
export declare function wrapWeakType<TValue>(type: GraphQLOutputType): StrongOutputType<TValue>;
