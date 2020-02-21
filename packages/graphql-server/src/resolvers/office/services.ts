import officeAPI from './api'
import logger from '../../logger'
import { ServerContext } from '../../app'
import { UpdateOfficeParams, GetOfficesParams, CreateOfficeModel, GetOfficeParams } from './offices'

export const getOffices = (args: GetOfficesParams, context: ServerContext) => {
  const traceId = context.traceId

  logger.info('getOffices', { traceId, args })

  const offices = officeAPI.callGetOfficesAPI(args, context)

  return offices
}

export const getOfficeById = (args: GetOfficeParams, context: ServerContext) => {
  const traceId = context.traceId

  logger.info('getOfficeById', { traceId, args })

  const office = officeAPI.callGetOfficeByIdAPI(args, context)

  return office
}

export const createOffice = (args: CreateOfficeModel, context: ServerContext) => {
  const traceId = context.traceId

  logger.info('createOffice', { traceId, args })

  const office = officeAPI.callCreateOfficeAPI(args, context)

  return office
}

export const updateOffice = (args: UpdateOfficeParams, context: ServerContext) => {
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
