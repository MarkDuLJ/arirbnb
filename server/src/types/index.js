import {gql} from 'apollo-server-express'
import get from './get.js'
import status from './status.js'

export const typeDefs = gql`
    type Category{
        _id:ID!
        name: String
        attributes: [Attribute]
    }

    type Attribute {
    _id: ID!
    name: String
    required: Boolean
    formatting: [Format]
  }

  type Format {
    compose: String
    fields: [Field]
  }

  type Field {
    name: String
    regexes: [String]
    options: [String]
  }

  input GetCategoryInput {
    _id: ID
    name: String
  }

  type GetCategoryOutput {
    category: Category
  }

  type ItemCategoryInfo {
    name: String
    total: ID
  }

  type GetItemCategoryInfoOutput {
    total: Int
    status: [Int]
    categories: [ItemCategoryInfo]
  }

  type Query {
    getCategory(input: GetCategoryInput): GetCategoryOutput
    getItemCategoryInfo: GetItemCategoryInfoOutput
  }
`

export const resolvers = {
    // types: {

    // },
    Query: {
        getCategory: get,
        getItemCategoryInfo: status,
    },
    // mutations: {},
};
