"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
function createListType(type) {
    if (type._strongInputType && type._strongOutputType) {
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
    else if (type._strongInputType) {
        const nullableListType = {
            _strongType: true,
            _strongInputType: true,
            _strongValue: undefined,
            getWeakType: () => new graphql_1.GraphQLList(type.getWeakType()),
            getWeakInputType: () => new graphql_1.GraphQLList(type.getWeakInputType()),
            nullable: () => nullableListType,
        };
        const listType = {
            _strongType: true,
            _strongInputType: true,
            _strongValue: undefined,
            getWeakType: () => new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(type.getWeakType())),
            getWeakInputType: () => new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(type.getWeakInputType())),
            nullable: () => nullableListType,
        };
        return listType;
    }
    else if (type._strongOutputType) {
        const nullableListType = {
            _strongType: true,
            _strongOutputType: true,
            _strongValue: undefined,
            getWeakType: () => new graphql_1.GraphQLList(type.getWeakType()),
            getWeakOutputType: () => new graphql_1.GraphQLList(type.getWeakOutputType()),
            nullable: () => nullableListType,
        };
        const listType = {
            _strongType: true,
            _strongOutputType: true,
            _strongValue: undefined,
            getWeakType: () => new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(type.getWeakType())),
            getWeakOutputType: () => new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(type.getWeakOutputType())),
            nullable: () => nullableListType,
        };
        return listType;
    }
}
exports.createListType = createListType;
