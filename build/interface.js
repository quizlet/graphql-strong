"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const description_1 = require("./description");
const args_1 = require("./args");
function createInterfaceType(config) {
    return new StrongInterfaceType(new StrongNullableInterfaceType(description_1.trimDescriptionsInConfig(config)));
}
exports.createInterfaceType = createInterfaceType;
/**
 * The interface type class created by `createInterfaceType`. It is
 * non-null, to get the nullable variant just call `.nullable()`.
 */
class StrongInterfaceType extends graphql_1.GraphQLNonNull {
    constructor(nullableType) {
        super(nullableType);
        // The required type flags.
        this._strongType = true;
        this._strongOutputType = true;
        this._strongValue = undefined;
    }
    // The required type conversion methods.
    getWeakType() { return this; }
    getWeakOutputType() { return this; }
    /**
     * Returns the inner nullable version of this type without mutating anything.
     */
    nullable() {
        return this.ofType;
    }
    /**
     * Returns the configuration object for fields on this interface.
     *
     * This method is private and should only be called inside of
     * `graphql-strong`.
     */
    _getFieldConfigMap() {
        return this.ofType._getFieldConfigMap();
    }
}
exports.StrongInterfaceType = StrongInterfaceType;
/**
 * The class for the nullable variant of the interface type. Because nullability
 * is reversed in `graphql-strong`, this is what actually extends the GraphQL.js
 * interface type.
 */
class StrongNullableInterfaceType extends graphql_1.GraphQLInterfaceType {
    constructor(config) {
        super({
            name: config.name,
            description: config.description,
            resolveType: typeof config.resolveType === 'function'
                ? value => config.resolveType(value).ofType
                : undefined,
            // Compute our fields from the fields map we were provided in the config.
            // The format we define in our config is pretty similar to the format
            // GraphQL.js expects.
            fields: () => {
                const weakFields = {};
                for (const fieldName of Object.keys(config.fields)) {
                    const fieldConfig = config.fields[fieldName];
                    weakFields[fieldName] = {
                        description: fieldConfig.description,
                        deprecationReason: fieldConfig.deprecationReason,
                        type: fieldConfig.type.getWeakOutputType(),
                        args: fieldConfig.args && args_1.getWeakArgsMap(fieldConfig.args),
                    };
                }
                return weakFields;
            },
        });
        // The required type flags.
        this._strongType = true;
        this._strongOutputType = true;
        this._strongValue = undefined;
        this._strongConfig = config;
    }
    // The required type conversion methods.
    getWeakType() { return this; }
    getWeakOutputType() { return this; }
    /**
     * Returns self.
     */
    nullable() {
        return this;
    }
    /**
     * Returns the configuration object for fields on this interface.
     *
     * This method is private and should only be called inside of
     * `graphql-strong`.
     */
    _getFieldConfigMap() {
        return this._strongConfig.fields;
    }
}
exports.StrongNullableInterfaceType = StrongNullableInterfaceType;
