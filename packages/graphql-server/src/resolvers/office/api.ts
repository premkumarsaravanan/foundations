import { fetcher, setQueryParams } from '@reapit/elements'
import logger from '../../logger'
import { ServerContext } from '../../app'
import errors from '../../errors'
import { API_VERSION, URLS } from '../../constants/api'
import {
  GetOfficesParams,
  OfficeModel,
  PagedResultOfficeModel_,
  CreateOfficeModel,
  UpdateOfficeParams,
  GetOfficeParams,
} from './offices'

export const fetchOffices = (args: GetOfficesParams, context: ServerContext) =>
  fetcher({
    url: `${URLS.offices}/?${setQueryParams(args)}`,
    api: process.env['PLATFORM_API_BASE_URL'],
    method: 'GET',
    headers: {
      authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    },
  })

export const fetchOfficeById = (args: GetOfficeParams, context: ServerContext) =>
  fetcher({
    url: `${URLS.offices}/${args.id}`,
    api: process.env['PLATFORM_API_BASE_URL'],
    method: 'GET',
    headers: {
      authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    },
  })

export const fetchCreateOffice = (args: CreateOfficeModel, context: ServerContext) =>
  fetcher({
    url: `${URLS.offices}`,
    api: process.env['PLATFORM_API_BASE_URL'],
    method: 'POST',
    headers: {
      authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
    },
    body: args,
  })

export const fetchUpdateOffice = (args: UpdateOfficeParams, context: ServerContext) => {
  const { id, _eTag, ...body } = args
  return fetcher({
    url: `${URLS.offices}/${id}`,
    api: process.env['PLATFORM_API_BASE_URL'],
    body: body,
    method: 'PATCH',
    headers: {
      authorization: context.authorization,
      'Content-Type': 'application/json',
      'api-version': API_VERSION,
      'If-Match': _eTag,
    },
  })
}

export const callGetOfficesAPI = async (args: GetOfficesParams, context: ServerContext) => {
  const traceId = context.traceId
  try {
    logger.info('callGetOfficesAPI', { traceId, args })

    const response: PagedResultOfficeModel_ = await fetchOffices(args, context)

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
    const response: OfficeModel = await fetchOfficeById(args, context)

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
    await fetchCreateOffice(args, context)

    return true
  } catch (error) {
    logger.error('callCreateOfficeAPI', { traceId, error })

    return errors.generateUserInputError(traceId)
  }
}

export const callUpdateOfficeAPI = async (args: UpdateOfficeParams, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('callUpdateOfficeAPI', { args, traceId })

  const { id } = args

  try {
    await fetchUpdateOffice(args, context)

    const response: OfficeModel = await fetchOfficeById({ id }, context)

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
