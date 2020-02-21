import logger from '../../logger'
import { ServerContext } from '../../app'
import {
  GetAppointmentsArgs,
  GetAppointmentByIdArgs,
  UpdateAppointmentArgs,
  CreateAppointmentArgs,
} from './appointments'
import {
  callUpdateAppointmentByAPI,
  callGetAppointmentByIdAPI,
  callGetAppointmentsAPI,
  callCreateAppointmentByAPI,
} from './api'

export const updateAppointmentById = (args: UpdateAppointmentArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('updateAppointmentByAPI', { traceId, args })
  const appointment = callUpdateAppointmentByAPI(args, context)
  return appointment
}

export const getAppointments = (args: GetAppointmentsArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('getAppointments', { traceId, args })
  const appointment = callGetAppointmentsAPI(args, context)
  return appointment
}

export const getAppointmentById = (args: GetAppointmentByIdArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('getAppointmentById', { traceId, args })
  const appointment = callGetAppointmentByIdAPI(args, context)
  return appointment
}

export const createAppointmentAPI = (args: CreateAppointmentArgs, context: ServerContext) => {
  const traceId = context.traceId
  logger.info('createAppointmentByAPI', { traceId, args })
  const appointment = callCreateAppointmentByAPI(args, context)
  return appointment
}

const appointmentServices = {
  updateAppointmentById,
  getAppointmentById,
  getAppointments,
  createAppointmentAPI,
}

export default appointmentServices
