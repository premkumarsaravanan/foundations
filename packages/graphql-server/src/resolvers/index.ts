import GraphQLJSON from 'graphql-type-json'
import { queryContact, queryContacts } from './contact/resolvers'
import {
  mutationCreateAppointment,
  mutationUpdateAppointment,
  queryAppointment,
  queryAppointments,
} from './appointment/resolvers'
import { createContactIdentityCheck } from './contact-identity-check/resolvers'
import { login } from './auth/resolvers'

export const resolvers = {
  Query: {
    contact: queryContact,
    contacts: queryContacts,
    getAppointment: queryAppointment,
    getAppointments: queryAppointments,
  },
  Mutation: {
    login,
    createContactIdentityCheck,
    createAppointment: mutationCreateAppointment,
    updateAppointment: mutationUpdateAppointment,
  },
  JSON: GraphQLJSON,
}

export default resolvers
