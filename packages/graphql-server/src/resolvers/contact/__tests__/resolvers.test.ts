import { queryContact, queryContacts, createContact } from '../resolvers'
import { GetContactByIdArgs, GetContactsArgs } from '../contact'
import { mockContext } from '../../../__mocks__/context'
import { contact } from '../__mocks__/contact'
import { contacts } from '../__mocks__/contacts'
import { mockCreateArgs } from '../__mocks__/create-args'
import errors from '../../../errors'

jest.mock('../services', () => ({
  getContactById: jest.fn(() => contact),
  getContacts: jest.fn(() => contacts),
  createContact: jest.fn(() => contact),
}))

describe('contact resolvers', () => {
  describe('queryContact', () => {
    it('should run correctly', () => {
      const mockArgs = {
        id: '123',
      } as GetContactByIdArgs
      const output = contact
      const result = queryContact({}, mockArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const mockArgs = {
        id: '123',
      } as GetContactByIdArgs
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryContact({}, mockArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('queryContacts', () => {
    it('should run correctly', () => {
      const mockArgs = {
        name: 'mockName',
      } as GetContactsArgs
      const output = contacts
      const result = queryContacts({}, mockArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const mockArgs = {
        name: 'mockName',
      } as GetContactsArgs
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryContacts({}, mockArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('createContact', () => {
    it('should run correctly', () => {
      const output = contact
      const result = createContact({}, mockCreateArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = createContact({}, mockCreateArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })
})
