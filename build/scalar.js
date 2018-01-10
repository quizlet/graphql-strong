"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const description_1 = require("./description");
function createScalarType(config) {
    return new StrongScalarType(new StrongNullableScalarType(description_1.trimDescriptionsInConfig(config)));
}
exports.createScalarType = createScalarType;
/**
 * The non-null strong GraphQL scalar type object.
 */
class StrongScalarType extends graphql_1.GraphQLNonNull {
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
 * The nullable sstrong GraphQL scalar type object.
 */
class StrongNullableScalarType extends graphql_1.GraphQLScalarType {
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
