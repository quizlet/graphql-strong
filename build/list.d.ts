import { StrongInputType, StrongInputOutputType, StrongOutputType } from './type';
/**
 * Creates a strong list type where the inner type is whatever GraphQL strong
 * type is passed in.
 */
export declare function createListType<TValue>(type: StrongInputOutputType<TValue>): StrongInputOutputType<Array<TValue>>;
export declare function createListType<TValue>(type: StrongInputType<TValue>): StrongInputType<Array<TValue>>;
export declare function createListType<TValue>(type: StrongOutputType<TValue>): StrongOutputType<Array<TValue>>;
