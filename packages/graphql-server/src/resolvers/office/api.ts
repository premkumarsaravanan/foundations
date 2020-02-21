import queryString from 'query-string'
import { fetcher } from '@reapit/elements'
import logger from '../../logger'
import { ServerContext } from '../../app'
import errors from '../../errors'
import { URLS, HEADERS } from '../../constants/api'
import {
  GetOfficesParams,
  OfficeModel,
  PagedResultOfficeModel_,
  CreateOfficeModel,
  UpdateOfficeParams,
  GetOfficeParams,
} from './offices'

export const callGetOfficesAPI = async (args: GetOfficesParams, context: ServerContext) => {
  const traceId = context.traceId
  try {
    logger.info('callGetOfficesAPI', { traceId, args })

    const response: PagedResultOfficeModel_ = await fetcher({
      url: `${URLS.offices}/?${queryString.stringify(args)}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      method: 'GET',
      headers: {
        ...HEADERS,
        authorization: context.authorization,
      },
    })

    return response
  } catch (error) {
    logger.error('callGetOfficesAPI', { traceId, error })

    return errors.generateUserInputError(traceId)
  }
}

export const callGetOfficeByIdAPI = async (args: GetOfficeParams, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('callGetOfficeByIdAPI', { args, traceId })

  try {
    const response: OfficeModel = await fetcher({
      url: `${URLS.offices}/${args.id}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      method: 'GET',
      headers: {
        ...HEADERS,
        authorization: context.authorization,
      },
    })

    return response
  } catch (error) {
    logger.error('callGetOfficeByIdAPI', { traceId, error })

    return errors.generateUserInputError(traceId)
  }
}

export const callCreateOfficeAPI = async (args: CreateOfficeModel, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('callCreateOfficeAPI', { args, traceId })
  try {
    await fetcher({
      url: `${URLS.offices}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      method: 'POST',
      headers: {
        ...HEADERS,
        authorization: context.authorization,
      },
      body: args,
    })

    return true
  } catch (error) {
    logger.error('callCreateOfficeAPI', { traceId, error })

    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateOfficeAPI = async (args: UpdateOfficeParams, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('callUpdateOfficeAPI', { args, traceId })

  try {
    const { id, _eTag, ...body } = args

    await fetcher({
      url: `${URLS.offices}/${id}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      body: body,
      method: 'PATCH',
      headers: {
        ...HEADERS,
        authorization: context.authorization,
        'If-Match': _eTag,
      },
    })

    const response: OfficeModel = await fetcher({
      url: `${URLS.offices}/${args.id}`,
      api: process.env['PLATFORM_API_BASE_URL'],
      method: 'GET',
      headers: {
        ...HEADERS,
        authorization: context.authorization,
      },
    })

    return response
  } catch (error) {
    logger.error('callUpdateOfficeAPI', { traceId, error })

    return errors.generateUserInputError(traceId)
  }
}

const officeAPI = {
  callGetOfficesAPI,
  callCreateOfficeAPI,
  callUpdateOfficeAPI,
  callGetOfficeByIdAPI,
}

export default officeAPI
