/**
 * Please follow the <<STATE>>_<<ACTION_TYPE>> pattern and group actions by STATE
 */
const ActionTypes = {
  // CurrentLoc actions
  SET_CURRENT_LOC: 'SET_CURRENT_LOC',

  // Online actions
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',

  // Auth actions
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_CHANGE_LOGIN_TYPE: 'AUTH_CHANGE_LOGIN_TYPE',
  AUTH_SET_DESKTOP_SESSION: 'AUTH_SET_DESKTOP_SESSION',

  // Error actions
  ERROR_THROWN_COMPONENT: 'ERROR_THROWN_COMPONENT',
  ERROR_THROWN_SERVER: 'ERROR_THROWN_SERVER',
  ERROR_CLEARED_COMPONENT: 'ERROR_CLEARED_COMPONENT',
  ERROR_CLEARED_SERVER: 'ERROR_CLEARED_SERVER',

  HOME_REQUEST_DATA: 'HOME_REQUEST_DATA',
  HOME_REQUEST_FAILURE: 'HOME_REQUEST_FAILURE',
  HOME_LOADING: 'HOME_LOADING',
  HOME_RECEIVE_DATA: 'HOME_RECEIVE_DATA',
  HOME_CLEAR_DATA: 'HOME_CLEAR_DATA',

  // Appointments actions
  APPOINTMENTS_REQUEST_DATA: 'APPOINTMENTS_REQUEST_DATA',
  APPOINTMENTS_REQUEST_FAILURE: 'APPOINTMENTS_REQUEST_FAILURE',
  APPOINTMENTS_LOADING: 'APPOINTMENTS_LOADING',
  APPOINTMENTS_RECEIVE_DATA: 'APPOINTMENTS_RECEIVE_DATA',
  APPOINTMENTS_CLEAR_DATA: 'APPOINTMENTS_CLEAR_DATA',

  // Appointment details
  APPOINTMENT_DETAIL_REQUEST_DATA: 'APPOINTMENT_DETAIL_REQUEST_DATA',
  APPOINTMENT_DETAIL_REQUEST_FAILURE: 'APPOINTMENTS_REQUEST_FAILURE',
  APPOINTMENT_DETAIL_LOADING: 'APPOINTMENT_DETAIL_LOADING',
  APPOINTMENT_DETAIL_RECEIVE_DATA: 'APPOINTMENTS_DETAIL_RECEIVE_DATA',
  APPOINTMENT_DETAIL_SHOW_MODAL: 'APPOINTMENT_DETAIL_SHOW_MODAL',
  APPOINTMENT_DETAIL_HIDE_MODAL: 'APPOINTMENT_DETAIL_HIDE_MODAL',

  // Next appointment
  NEXT_APPOINTMENT_VALIDATE: 'NEXT_APPOINTMENT_VALIDATE',
  NEXT_APPOINTMENT_VALIDATE_SUCCESS: 'NEXT_APPOINTMENT_VALIDATE_SUCCESS',
  NEXT_APPOINTMENT_CLEAR: 'NEXT_APPOINTMENT_CLEAR'
}

export default ActionTypes
