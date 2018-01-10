"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
function createSchema(config) {
    return new StrongSchema(config);
}
exports.createSchema = createSchema;
/**
 * The strong GraphQL schema represents a type-safe GraphQL schema that forces
 * type correctness on execution with the `execute` method.
 */
class StrongSchema extends graphql_1.GraphQLSchema {
    constructor(config) {
        super({
            query: config.query.ofType.clone(),
            mutation: config.mutation && config.mutation.ofType.clone(),
        });
        const { onExecute } = config;
        // If we were given an `onExecute` function in the configuration then we
        // must add it to our root query types.
        if (onExecute) {
            const executedOperations = new WeakMap();
            const rootTypes = [
                this.getQueryType(),
                this.getMutationType(),
            ].filter(Boolean);
            rootTypes.forEach(rootType => {
                const fields = rootType.getFields();
                for (const fieldName of Object.keys(fields)) {
                    const resolver = fields[fieldName].resolve || graphql_1.defaultFieldResolver;
                    // Wrap our resolver so that our `onExecute` handler runs if provided.
                    fields[fieldName].resolve = (source, args, context, info) => __awaiter(this, void 0, void 0, function* () {
                        // If we have not yet executed our root level `onExecute` function,
                        // then call it.
                        if (!executedOperations.has(info.operation)) {
                            executedOperations.set(info.operation, Promise.resolve(onExecute(source, context, info)));
                        }
                        // Wait for our `onExecute` function to resolve or reject whether
                        // `onExecute` was called here or not.
                        yield executedOperations.get(info.operation);
                        return yield resolver(source, args, context, info);
                    });
                }
            });
        }
    }
    /**
     * A type-safe execution function for our strong GraphQL schema. With this
     * function you will be forced to provide values and contexts of the correct
     * types.
     */
    execute(query, value, context, variables = {}, operation) {
        return graphql_1.graphql(this, query, value, context, variables, operation);
    }
}
exports.StrongSchema = StrongSchema;
