import { StrongInputOutputType } from './type';
/**
 * Creates a type-safe non-null enum GraphQL type.
 */
export declare function createEnumType<TValue>(config: StrongEnumTypeConfig<TValue>): StrongInputOutputType<TValue>;
/**
 * The configuration for an enum type.
 */
export declare type StrongEnumTypeConfig<TValue> = {
    readonly name: string;
    readonly description?: string | undefined;
    readonly values: {
        readonly [valueName: string]: {
            readonly value: TValue;
            readonly description?: string | undefined;
            readonly deprecationReason?: string | undefined;
        };
    };
};
