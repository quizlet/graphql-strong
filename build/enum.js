"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const description_1 = require("./description");
/**
 * Creates a type-safe non-null enum GraphQL type.
 */
function createEnumType(config) {
    return new StrongEnumType(new StrongNullableEnumType(description_1.trimDescriptionsInConfig(config)));
}
exports.createEnumType = createEnumType;
/**
 * The non-null strong GraphQL enum type object.
 */
class StrongEnumType extends graphql_1.GraphQLNonNull {
    constructor(nullableType) {
        super(nullableType);
        // The required type flags.
        this._strongType = true;
        this._strongInputType = true;
        this._strongOutputType = true;
        this._strongValue = undefined;
    }
    // The required type conversion methods.
    getWeakType() { return this; }
    getWeakInputType() { return this; }
    getWeakOutputType() { return this; }
    /**
     * Returns the inner nullable variation of this type.
     */
    nullable() {
        return this.ofType;
    }
}
/**
 * The nullable sstrong GraphQL enum type object.
 */
class StrongNullableEnumType extends graphql_1.GraphQLEnumType {
    constructor(config) {
        super(config);
        // The required type flags.
        this._strongType = true;
        this._strongInputType = true;
        this._strongOutputType = true;
        this._strongValue = undefined;
    }
    // The required type conversion methods.
    getWeakType() { return this; }
    getWeakInputType() { return this; }
    getWeakOutputType() { return this; }
    /**
     * Returns self.
     */
    nullable() {
        return this;
    }
}
