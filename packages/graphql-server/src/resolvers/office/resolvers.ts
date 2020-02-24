import { AuthenticationError, UserInputError } from 'apollo-server'
import officeServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  UpdateOfficeModel,
  GetOfficesParams,
  CreateOfficeModel,
  GetOfficeParams,
  OfficeModel,
  PagedResultOfficeModel_,
} from './offices'

export const queryOffice = (
  _: any,
  args: GetOfficeParams,
  context: ServerContext,
): Promise<OfficeModel | UserInputError> | AuthenticationError => {
  const traceId = context.traceId

  logger.info('queryOffice', { traceId, args })

  const isPermit = checkPermission(context)

  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return officeServices.getOfficeById(args, context)
}

export const queryOffices = (
  _: any,
  args: GetOfficesParams,
  context: ServerContext,
): Promise<PagedResultOfficeModel_ | UserInputError> | AuthenticationError => {
  const traceId = context.traceId

  logger.info('queryOffices', { traceId, args })

  const isPermit = checkPermission(context)

  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return officeServices.getOffices(args, context)
}

export const mutationCreateOffice = (
  _: any,
  args: CreateOfficeModel,
  context: ServerContext,
): Promise<Boolean | UserInputError> | AuthenticationError => {
  const traceId = context.traceId

  logger.info('mutationCreateOffice', { traceId, args })

  const isPermit = checkPermission(context)

  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return officeServices.createOffice(args, context)
}

export const mutationUpdateOffice = (
  _: any,
  args: UpdateOfficeModel,
  context: ServerContext,
): Promise<OfficeModel | UserInputError> | AuthenticationError => {
  const traceId = context.traceId

  logger.info('mutationUpdateOffice', { traceId, args })

  const isPermit = checkPermission(context)

  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }

  return officeServices.updateOffice(args, context)
}
