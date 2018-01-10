"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
/**
 * Creates a strong list type where the inner type is whatever GraphQL strong
 * type is passed in.
 */
function createListType(type) {
    const nullableListType = {
        _strongType: true,
        _strongInputType: true,
        _strongOutputType: true,
        _strongValue: undefined,
        getWeakType: () => new graphql_1.GraphQLList(type.getWeakType()),
        getWeakInputType: () => new graphql_1.GraphQLList(type.getWeakInputType()),
        getWeakOutputType: () => new graphql_1.GraphQLList(type.getWeakOutputType()),
        nullable: () => nullableListType,
    };
    const listType = {
        _strongType: true,
        _strongInputType: true,
        _strongOutputType: true,
        _strongValue: undefined,
        getWeakType: () => new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(type.getWeakType())),
        getWeakInputType: () => new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(type.getWeakInputType())),
        getWeakOutputType: () => new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(type.getWeakOutputType())),
        nullable: () => nullableListType,
    };
    return listType;
}
exports.createListType = createListType;
