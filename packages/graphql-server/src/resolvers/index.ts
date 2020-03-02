import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts } from './contact/resolvers'
import {
  createIdentityCheck,
  queryIdentityChecks,
  queryIdentityCheckById,
  updateIdentityCheck,
} from './identity-check/resolvers'
import { queryArea, queryAreas, mutationCreateArea, mutationUpdateArea } from './area/resolvers'
import { queryNegotiatorById, queryNegotiators, createNegotiator, updateNegotiator } from './negotiators/resolvers'
import { login } from './auth/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
    contacts: queryContacts,
    GetIdCheckById: queryIdentityCheckById,
    GetIdChecks: queryIdentityChecks,
    area: queryArea,
    areas: queryAreas,
    GetNegotiatorById: queryNegotiatorById,
    GetNegotiators: queryNegotiators,
  },
  Mutation: {
    login,
    CreateIdentityCheck: createIdentityCheck,
    UpdateIdentityCheck: updateIdentityCheck,
    createArea: mutationCreateArea,
    updateArea: mutationUpdateArea,
    CreateNegotiator: createNegotiator,
    UpdateNegotiator: updateNegotiator,
  },
  JSON: GraphQLJSON,
}

export default resolvers
