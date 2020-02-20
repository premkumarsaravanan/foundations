import { queryNegotiators, queryNegotiator, createNegotiator, updateNegotiator } from '../resolvers'
import { GetNegotiatorByIdArgs, GetNegotiatorsArgs } from '../negotiator'
import { mockContext } from '../../../__mocks__/context'
import { negotiatorStub } from '../__mocks__/negotiator'
import { negotiatorsStub } from '../__mocks__/negotiators'
import { createArgStub } from '../__mocks__/create-arg'
import { updateArgStub } from '../__mocks__/update-arg'

import errors from '../../../errors'

jest.mock('../services', () => ({
  getNegotiatorById: jest.fn(() => negotiatorStub),
  getNegotiators: jest.fn(() => negotiatorsStub),
  createNegotiator: jest.fn(() => negotiatorStub),
  updateNegotiator: jest.fn(() => negotiatorStub),
}))

describe('negotiator resolvers', () => {
  describe('queryNegotiator', () => {
    it('should run correctly', () => {
      const mockArgs = {
        id: 'MGL',
      } as GetNegotiatorByIdArgs
      const output = negotiatorStub
      const result = queryNegotiator({}, mockArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const mockArgs = {
        id: 'MGL',
      } as GetNegotiatorByIdArgs
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryNegotiator({}, mockArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('queryNegotiators', () => {
    it('should run correctly', () => {
      const mockArgs = {
        name: 'Abel Robertson',
      } as GetNegotiatorsArgs
      const output = negotiatorsStub
      const result = queryNegotiators({}, mockArgs, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const mockArgs = {
        name: 'Abel Robertson',
      } as GetNegotiatorsArgs
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = queryNegotiators({}, mockArgs, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('createNegotiator', () => {
    it('should run correctly', () => {
      const output = negotiatorStub
      const result = createNegotiator({}, createArgStub, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = createNegotiator({}, createArgStub, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })

  describe('updateNegotiator', () => {
    it('should run correctly', () => {
      const output = negotiatorStub
      const result = updateNegotiator({}, { id: 'MGL', model: updateArgStub }, mockContext)
      expect(result).toEqual(output)
    })

    it('should return errors', () => {
      const output = errors.generateAuthenticationError(mockContext.traceId)
      const result = updateNegotiator({}, { id: 'MGL', model: updateArgStub }, { ...mockContext, authorization: '' })
      expect(result).toEqual(output)
    })
  })
})