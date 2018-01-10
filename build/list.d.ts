import { StrongInputOutputType } from './type';
/**
 * Creates a strong list type where the inner type is whatever GraphQL strong
 * type is passed in.
 */
export declare function createListType<TValue>(type: StrongInputOutputType<TValue>): StrongInputOutputType<Array<TValue>>;
