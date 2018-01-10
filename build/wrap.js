"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// Wrappings for types that are baked into the standard library.
exports.IntegerType = wrapWeakType(graphql_1.GraphQLInt);
exports.FloatType = wrapWeakType(graphql_1.GraphQLFloat);
exports.StringType = wrapWeakType(graphql_1.GraphQLString);
exports.BooleanType = wrapWeakType(graphql_1.GraphQLBoolean);
exports.IDType = wrapWeakType(graphql_1.GraphQLID);
function wrapWeakType(type) {
    const nullableStrongType = {
        _strongType: true,
        _strongInputType: true,
        _strongOutputType: true,
        _strongValue: undefined,
        getWeakType: () => type,
        getWeakInputType: () => graphql_1.assertInputType(type),
        getWeakOutputType: () => graphql_1.assertOutputType(type),
        nullable: () => nullableStrongType,
    };
    const strongType = {
        _strongType: true,
        _strongInputType: true,
        _strongOutputType: true,
        _strongValue: undefined,
        getWeakType: () => new graphql_1.GraphQLNonNull(type),
        getWeakInputType: () => new graphql_1.GraphQLNonNull(graphql_1.assertInputType(type)),
        getWeakOutputType: () => new graphql_1.GraphQLNonNull(graphql_1.assertOutputType(type)),
        nullable: () => nullableStrongType,
    };
    return strongType;
}
exports.wrapWeakType = wrapWeakType;
