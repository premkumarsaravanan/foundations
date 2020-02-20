import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts } from './contact/resolvers'
import {
  createIdentityCheck,
  queryIdentityChecks,
  queryIdentityCheckById,
  updateIdentityCheck,
} from './identity-check/resolvers'
<<<<<<< HEAD
<<<<<<< HEAD
import { queryArea, queryAreas, mutationCreateArea, mutationUpdateArea } from './area/resolvers'
=======
=======
import { createContactIdentityCheck } from './contact-identity-check/resolvers'
import { queryNegotiator, queryNegotiators, createNegotiator, updateNegotiator } from './negotiators/resolvers'
<<<<<<< HEAD
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
=======
>>>>>>> feat: #371 Fix comments
=======
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
import { login } from './auth/resolvers'
import { queryNegotiatorById, queryNegotiators, createNegotiator, updateNegotiator } from './negotiators/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
    contacts: queryContacts,
<<<<<<< HEAD
    GetIdCheckById: queryIdentityCheckById,
    GetIdChecks: queryIdentityChecks,
<<<<<<< HEAD
    area: queryArea,
    areas: queryAreas,
=======
    negotiator: queryNegotiatorById,
    negotiators: queryNegotiators,
>>>>>>> feat: #371 Fix comments
  },
  Mutation: {
    login,
    CreateIdentityCheck: createIdentityCheck,
    UpdateIdentityCheck: updateIdentityCheck,
<<<<<<< HEAD
<<<<<<< HEAD
    createArea: mutationCreateArea,
    updateArea: mutationUpdateArea,
=======
=======
=======
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
    negotiator: queryNegotiator,
    negotiators: queryNegotiators,
  },
  Mutation: {
    login,
    createContactIdentityCheck,
    createNegotiator,
    updateNegotiator,
<<<<<<< HEAD
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
=======
    createNegotiator,
    updateNegotiator,
>>>>>>> feat: #371 Fix comments
=======
>>>>>>> feat: #371 Implement resolver for graphql server: negotiator services
  },
  JSON: GraphQLJSON,
}

export default resolvers