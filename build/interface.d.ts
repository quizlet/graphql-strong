import { GraphQLNonNull, GraphQLInterfaceType } from 'graphql';
import { StrongOutputType } from './type';
import { StrongArgsConfig } from './args';
import { StrongObjectType } from './object';
/**
 * Creates a new strong GraphQL interface type. In addition to the runtime
 * configuration object there is also one important type parameter: `TFieldMap`.
 * `TFieldMap` will be used to compute a lot of things involving this interface.
 *
 * This returns the non-null interface type. To get the nullable type just call
 * `.nullable()`.
 */
export declare function createInterfaceType<TFieldMap extends StrongInterfaceFieldMap>(config: StrongInterfaceTypeConfig<{}, TFieldMap>): StrongInterfaceType<{}, TFieldMap>;
export declare function createInterfaceType<TValue, TFieldMap extends StrongInterfaceFieldMap>(config: StrongInterfaceTypeConfig<TValue, TFieldMap>): StrongInterfaceType<TValue, TFieldMap>;
/**
 * The structure of the type we want as a type argument to
 * `createInterfaceType`.
 *
 * This type uniquely *does not* represent any runtime type. Instead it only
 * represents an abstract type that will be transformed into other types used in
 * defining and implementing interfaces.
 */
export declare type StrongInterfaceFieldMap = {
    [fieldName: string]: {
        type: any;
        args?: {
            [argName: string]: any;
        };
    };
};
/**
 * The configuration object to be used when creating interface types. It
 * requires  `fields`.
 */
export declare type StrongInterfaceTypeConfig<TValue, TFieldMap extends StrongInterfaceFieldMap> = {
    readonly name: string;
    readonly description?: string | undefined;
    readonly resolveType?: (value: TValue) => StrongObjectType<TValue, never>;
    readonly fields: StrongInterfaceFieldMapConfig<TFieldMap>;
};
/**
 * The type for a fields configuration map.
 */
export declare type StrongInterfaceFieldMapConfig<TFieldMap extends StrongInterfaceFieldMap> = {
    readonly [TField in keyof TFieldMap]: StrongInterfaceFieldConfig<TFieldMap[TField]['args'], TFieldMap[TField]['type']>;
};
/**
 * The configuration type for a single interface field.
 */
export declare type StrongInterfaceFieldConfig<TArgs, TValue> = {
    readonly description?: string | undefined;
    readonly deprecationReason?: string | undefined;
    readonly type: StrongOutputType<TValue>;
    readonly args?: StrongArgsConfig<TArgs>;
};
/**
 * The object that users will use to implement an interface on a strong object
 * type. It is a map of field names to resolver functions.
 */
export declare type StrongInterfaceImplementation<TValue, TContext, TFieldMap extends StrongInterfaceFieldMap> = {
    readonly [TField in keyof TFieldMap]: StrongInterfaceFieldImplementation<TValue, TFieldMap[TField]['args'], TContext, TFieldMap[TField]['type']>;
};
/**
 * The resolver function that is used to implement an interface on a strong
 * object type.
 */
export declare type StrongInterfaceFieldImplementation<TSourceValue, TArgs, TContext, TValue> = (source: TSourceValue, args: TArgs, context: TContext) => TValue | Promise<TValue>;
/**
 * The interface type class created by `createInterfaceType`. It is
 * non-null, to get the nullable variant just call `.nullable()`.
 */
export declare class StrongInterfaceType<TValue, TFieldMap extends StrongInterfaceFieldMap> extends GraphQLNonNull<StrongNullableInterfaceType<TValue, TFieldMap>> implements StrongOutputType<TValue> {
    readonly _strongType: true;
    readonly _strongOutputType: true;
    readonly _strongValue: TValue;
    constructor(nullableType: StrongNullableInterfaceType<TValue, TFieldMap>);
    getWeakType(): this;
    getWeakOutputType(): this;
    /**
     * Returns the inner nullable version of this type without mutating anything.
     */
    nullable(): StrongOutputType<TValue | null | undefined>;
    /**
     * Returns the configuration object for fields on this interface.
     *
     * This method is private and should only be called inside of
     * `graphql-strong`.
     */
    _getFieldConfigMap(): StrongInterfaceFieldMapConfig<TFieldMap>;
}
/**
 * The class for the nullable variant of the interface type. Because nullability
 * is reversed in `graphql-strong`, this is what actually extends the GraphQL.js
 * interface type.
 */
export declare class StrongNullableInterfaceType<TValue, TFieldMap extends StrongInterfaceFieldMap> extends GraphQLInterfaceType implements StrongOutputType<TValue | null | undefined> {
    readonly _strongType: true;
    readonly _strongOutputType: true;
    readonly _strongValue: TValue | null | undefined;
    private readonly _strongConfig;
    constructor(config: StrongInterfaceTypeConfig<TValue, TFieldMap>);
    getWeakType(): this;
    getWeakOutputType(): this;
    /**
     * Returns self.
     */
    nullable(): this;
    /**
     * Returns the configuration object for fields on this interface.
     *
     * This method is private and should only be called inside of
     * `graphql-strong`.
     */
    _getFieldConfigMap(): StrongInterfaceFieldMapConfig<TFieldMap>;
}
