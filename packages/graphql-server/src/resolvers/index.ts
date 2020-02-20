import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts } from './contact/resolvers'
<<<<<<< HEAD
import {
  createIdentityCheck,
  queryIdentityChecks,
  queryIdentityCheckById,
  updateIdentityCheck,
} from './identity-check/resolvers'
<<<<<<< HEAD
import { queryArea, queryAreas, mutationCreateArea, mutationUpdateArea } from './area/resolvers'
=======
=======
import { createContactIdentityCheck } from './contact-identity-check/resolvers'
import { queryNegotiator, queryNegotiators, createNegotiator, updateNegotiator } from './negotiators/resolvers'
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
import { login } from './auth/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
    contacts: queryContacts,
<<<<<<< HEAD
    GetIdCheckById: queryIdentityCheckById,
    GetIdChecks: queryIdentityChecks,
    area: queryArea,
    areas: queryAreas,
  },
  Mutation: {
    login,
    CreateIdentityCheck: createIdentityCheck,
    UpdateIdentityCheck: updateIdentityCheck,
<<<<<<< HEAD
    createArea: mutationCreateArea,
    updateArea: mutationUpdateArea,
=======
=======
    negotiator: queryNegotiator,
    negotiators: queryNegotiators,
  },
  Mutation: {
    login,
    createContactIdentityCheck,
    createNegotiator,
    updateNegotiator,
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
  },
  JSON: GraphQLJSON,
}

export default resolvers
