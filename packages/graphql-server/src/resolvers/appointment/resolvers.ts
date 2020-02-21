import appointmentServices from './services'
import { checkPermission } from '../../utils/check-permission'
import logger from '../../logger'
import errors from '../../errors'
import { ServerContext } from '../../app'
import {
  GetAppointmentByIdArgs,
  GetAppointmentsArgs,
  UpdateAppointmentArgs,
  CreateAppointmentArgs,
} from './appointments'

export const queryAppointment = (_: any, args: GetAppointmentByIdArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('queryAppointment', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.getAppointmentById(args, context)
}

export const queryAppointments = (_: any, args: GetAppointmentsArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('queryAppointments', { traceId, args })

  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.getAppointments(args, context)
}

export const mutationCreateAppointment = (_: any, args: CreateAppointmentArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('mutationCreateAppointment', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.createAppointmentAPI(args, context)
}

export const mutationUpdateAppointment = (_: any, args: UpdateAppointmentArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('mutationUpdateAppointment', { traceId, args })
  const isPermit = checkPermission(context)
  if (!isPermit) {
    return errors.generateAuthenticationError(context.traceId)
  }
  return appointmentServices.updateAppointmentById(args, context)
}
