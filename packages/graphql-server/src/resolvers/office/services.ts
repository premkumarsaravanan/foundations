import { UserInputError, AuthenticationError } from 'apollo-server'
import officeAPI from './api'
import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  UpdateOfficeModel,
  GetOfficesParams,
  CreateOfficeModel,
  GetOfficeParams,
  PagedResultOfficeModel_,
  OfficeModel,
} from './offices'

export const getOffices = (
  args: GetOfficesParams,
  context: ServerContext,
): Promise<PagedResultOfficeModel_ | UserInputError> | AuthenticationError => {
  const traceId = context.traceId

  logger.info('getOffices', { traceId, args })

  const offices = officeAPI.callGetOfficesAPI(args, context)

  return offices
}

export const getOfficeById = (
  args: GetOfficeParams,
  context: ServerContext,
): Promise<OfficeModel | UserInputError> | AuthenticationError => {
  const traceId = context.traceId

  logger.info('getOfficeById', { traceId, args })

  const office = officeAPI.callGetOfficeByIdAPI(args, context)

  return office
}

export const createOffice = (
  args: CreateOfficeModel,
  context: ServerContext,
): Promise<Boolean | UserInputError> | AuthenticationError => {
  const traceId = context.traceId

  logger.info('createOffice', { traceId, args })

  const office = officeAPI.callCreateOfficeAPI(args, context)

  return office
}

export const updateOffice = (
  args: UpdateOfficeModel,
  context: ServerContext,
): Promise<OfficeModel | UserInputError> | AuthenticationError => {
  const traceId = context.traceId

  logger.info('updateOffice', { traceId, args })

  const office = officeAPI.callUpdateOfficeAPI(args, context)

  return office
}

const officeServices = {
  getOffices,
  createOffice,
  updateOffice,
  getOfficeById,
}

export default officeServices
