import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { nextAppointmentValidateSuccess, nextAppointmentClear } from '../actions/next-appointment'
import { AppointmentContactModel, NegotiatorModel } from '@reapit/foundations-ts-definitions'

export interface NextAppointment {
  id: string
  attendeeWithMobile: AppointmentContactModel | undefined
  currentNegotiator: NegotiatorModel | undefined
  durationValue: number
  durationText: string
  distanceValue: number
  distanceText: string
}

export interface NextAppointmentState {
  data: NextAppointment | null
}

export const defaultState: NextAppointmentState = {
  data: null,
}

const nextAppointmentReducer = (
  state: NextAppointmentState = defaultState,
  action: Action<any>,
): NextAppointmentState => {
  if (isType(action, nextAppointmentValidateSuccess)) {
    return {
      ...state,
      data: action.data,
    }
  }

  if (isType(action, nextAppointmentClear)) {
    return {
      ...state,
      data: null,
    }
  }

  return state
}

export default nextAppointmentReducer
