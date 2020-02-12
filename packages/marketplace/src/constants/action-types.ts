/**
 * Please follow the <<STATE>>_<<ACTION_TYPE>> pattern and group actions by STATE
 */
const ActionTypes = {
  // Developer App Modal
  SET_DEVELOPER_APP_MODAL_STATE_EDIT_DETAIL: 'SET_DEVELOPER_APP_MODAL_STATE_EDIT_DETAIL',
  SET_DEVELOPER_APP_MODAL_STATE_VIEW_DETAIL: 'SET_DEVELOPER_APP_MODAL_STATE_VIEW_DETAIL',
  SET_DEVELOPER_APP_MODAL_STATE_DELETE: 'SET_DEVELOPER_APP_MODAL_STATE_DELETE',

  // Delete
  APP_DELETE_SET_INIT_FORM_STATE: 'APP_DELETE_SET_INIT_FORM_STATE',
  APP_DELETE_REQUEST: 'APP_DELETE_REQUEST',
  APP_DELETE_REQUEST_LOADING: 'APP_DELETE_REQUEST_LOADING',
  APP_DELETE_REQUEST_SUCCESS: 'APP_DELETE_REQUEST_SUCCESS',
  APP_DELETE_REQUEST_FAILURE: 'APP_DELETE_REQUEST_FAILURE',

  // Auth actions
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_LOGIN_FAILURE: 'AUTH_LOGIN_FAILURE',
  AUTH_LOGOUT: 'AUTH_LOGOUT',
  AUTH_LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
  AUTH_CHANGE_LOGIN_TYPE: 'AUTH_CHANGE_LOGIN_TYPE',
  AUTH_SET_REFRESH_SESSION: 'AUTH_SET_REFRESH_SESSION',
  AUTH_CLEAR: 'AUTH_CLEAR',
  CHECK_FIRST_TIME_LOGIN: 'CHECK_FIRST_TIME_LOGIN',
  TOGGLE_FIRST_LOGIN: 'TOGGLE_FIRST_LOGIN',
  USER_ACCEPT_TERM_AND_CONDITION: 'USER_ACCEPT_TERM_AND_CONDITION',
  CHECK_TERM_ACCEPTED_WITH_COOKIE: 'CHECK_TERM_ACCEPTED_WITH_COOKIE',
  SET_TERMS_ACCEPTED_WITH_COOKIE: 'SET_TERMS_ACCEPTED_WITH_COOKIE',
  SET_TERMS_ACCEPTED_STATE: 'SET_TERMS_ACCEPTED_STATE',

  // Error actions
  ERROR_THROWN_COMPONENT: 'ERROR_THROWN_COMPONENT',
  ERROR_THROWN_SERVER: 'ERROR_THROWN_SERVER',
  ERROR_CLEARED_COMPONENT: 'ERROR_CLEARED_COMPONENT',
  ERROR_CLEARED_SERVER: 'ERROR_CLEARED_SERVER',

  // notificarion message actions
  SHOW_NOTIFICATION_MESSAGE: 'SHOW_NOTIFICATION_MESSAGE',
  HIDE_NOTIFICATION_MESSAGE: 'HIDE_NOTIFICATION_MESSAGE',

  // Client actions
  CLIENT_REQUEST_DATA: 'CLIENT_REQUEST_DATA',
  CLIENT_REQUEST_FAILURE: 'CLIENT_REQUEST_FAILURE',
  CLIENT_LOADING: 'CLIENT_LOADING',
  CLIENT_RECEIVE_DATA: 'CLIENT_RECEIVE_DATA',
  CLIENT_CLEAR_DATA: 'CLIENT_CLEAR_DATA',

  // Installed apps actions
  INSTALLED_APPS_REQUEST_DATA: 'INSTALLED_APPS_REQUEST_DATA',
  INSTALLED_APPS_LOADING: 'INSTALLED_APPS_LOADING',
  INSTALLED_APPS_REQUEST_DATA_FAILURE: 'INSTALLED_APPS_REQUEST_DATA_FAILURE',
  INSTALLED_APPS_RECEIVE_DATA: 'INSTALLED_APPS_RECEIVE_DATA',
  INSTALLED_APPS_CLEAR_DATA: 'INSTALLED_APPS_CLEAR_DATA',

  // app statistics actions
  APP_USAGE_STATS_REQUEST_DATA: 'APP_USAGE_STATS_REQUEST_DATA',
  APP_USAGE_STATS_LOADING: 'APP_USAGE_STATS_LOADING',
  APP_USAGE_STATS_REQUEST_DATA_FAILURE: 'APP_USAGE_STATS_REQUEST_DATA_FAILURE',
  APP_USAGE_STATS_RECEIVE_DATA: 'APP_USAGE_STATS_RECEIVE_DATA',
  APP_USAGE_STATS_CLEAR_DATA: 'APP_USAGE_STATS_CLEAR_DATA',

  // My apps actions
  MY_APPS_REQUEST_DATA: 'MY_APPS_REQUEST_DATA',
  MY_APPS_LOADING: 'MY_APPS_LOADING',
  MY_APPS_REQUEST_DATA_FAILURE: 'MY_APPS_REQUEST_DATA_FAILURE',
  MY_APPS_RECEIVE_DATA: 'MY_APPS_RECEIVE_DATA',
  MY_APPS_CLEAR_DATA: 'MY_APPS_CLEAR_DATA',

  // Developer actions
  DEVELOPER_REQUEST_DATA: 'DEVELOPER_REQUEST_DATA',
  DEVELOPER_REQUEST_DATA_FAILURE: 'DEVELOPER_REQUEST_DATA_FAILURE',
  DEVELOPER_LOADING: 'DEVELOPER_LOADING',
  DEVELOPER_RECEIVE_DATA: 'DEVELOPER_RECEIVE_DATA',
  DEVELOPER_CLEAR_DATA: 'DEVELOPER_CLEAR_DATA',
  DEVELOPER_CREATE: 'DEVELOPER_CREATE',
  DEVELOPER_SET_FORM_STATE: 'DEVELOPER_SET_FORM_STATE',
  DEVELOPER_SHOW_MODAL: 'DEVELOPER_SHOW_MODAL',

  // App Detail actions
  APP_DETAIL_REQUEST_DATA: 'APP_DETAIL_REQUEST_DATA',
  APP_DETAIL_LOADING: 'APP_DETAIL_LOADING',
  APP_DETAIL_REQUEST_DATA_FAILURE: 'APP_DETAIL_REQUEST_DATA_FAILURE',
  APP_DETAIL_RECEIVE_DATA: 'APP_DETAIL_RECEIVE_DATA',
  APP_DETAIL_CLEAR_DATA: 'APP_DETAIL_CLEAR_DATA',
  APP_DETAIL_IS_STALE: 'APP_DETAIL_IS_STALE',

  REQUEST_AUTHENTICATION_CODE: 'REQUEST_AUTHENTICATION_CODE',
  REQUEST_AUTHENTICATION_CODE_SUCCESS: 'REQUEST_AUTHENTICATION_CODE_SUCCESS',
  REQUEST_AUTHENTICATION_CODE_FAILURE: 'REQUEST_AUTHENTICATION_CODE_FAILURE',
  REMOVE_AUTHENTICATION_CODE: 'REMOVE_AUTHENTICATION_CODE',

  // Admin Apps actions
  ADMIN_APPS_UPDATE_FILTER: 'ADMIN_APPS_UPDATE_FILTER',
  ADMIN_APPS_REQUEST_DATA: 'ADMIN_APPS_REQUEST_DATA',
  ADMIN_APPS_RECEIVE_DATA: 'ADMIN_APPS_RECEIVE_DATA',
  ADMIN_APPS_REQUEST_FAILURE: 'ADMIN_APPS_REQUEST_FAILURE',
  ADMIN_APPS_REQUEST_FEATURED: 'ADMIN_APPS_REQUEST_FEATURED',
  ADMIN_APPS_SET_FORM_STATE: 'ADMIN_APPS_SET_FORM_STATE',

  // submit app actions
  DEVELOPER_SUBMIT_APP: 'DEVELOPER_SUBMIT_APP',
  DEVELOPER_SUBMIT_APP_SET_FORM_STATE: 'DEVELOPER_SUBMIT_APP_SET_FORM_STATE',
  DEVELOPER_SUBMIT_APP_LOADING: 'DEVELOPER_SUBMIT_APP_LOADING',
  DEVELOPER_SUBMIT_APP_REQUEST_DATA: 'DEVELOPER_SUBMIT_APP_REQUEST_DATA',
  DEVELOPER_SUBMIT_APP_RECEIVE_DATA: 'DEVELOPER_SUBMIT_APP_RECEIVE_DATA',

  // submit revision acions
  DEVELOPER_SUBMIT_REVISION: 'DEVELOPER_SUBMIT_REVISION',
  DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE: 'DEVELOPER_SUBMIT_REVISION_SET_FORM_STATE',

  // Admin Approvals actions
  ADMIN_APPROVALS_REQUEST_DATA: 'ADMIN_APPROVALS_REQUEST_DATA',
  ADMIN_APPROVALS_REQUEST_FAILURE: 'ADMIN_APPROVALS_REQUEST_FAILURE',
  ADMIN_APPROVALS_LOADING: 'ADMIN_APPROVALS_LOADING',
  ADMIN_APPROVALS_RECEIVE_DATA: 'ADMIN_APPROVALS_RECEIVE_DATA',
  ADMIN_APPROVALS_CLEAR_DATA: 'ADMIN_APPROVALS_CLEAR_DATA',

  // Admin Dev Management
  ADMIN_DEV_MANAGEMENT_REQUEST_DATA: 'ADMIN_DEV_MANAGEMENT_REQUEST_DATA',
  ADMIN_DEV_MANAGEMENT_REQUEST_FAILURE: 'ADMIN_DEV_MANAGEMENT_REQUEST_FAILURE',
  ADMIN_DEV_MANAGEMENT_LOADING: 'ADMIN_DEV_MANAGEMENT_LOADING',
  ADMIN_DEV_MANAGEMENT_RECEIVE_DATA: 'ADMIN_DEV_MANAGEMENT_RECEIVE_DATA',
  ADMIN_DEV_MANAGEMENT_CLEAR_DATA: 'ADMIN_DEV_MANAGEMENT_CLEAR_DATA',

  // Admin Dev Management Delete Developer
  DEVELOPER_SET_STATUS_SET_INIT_FORM_STATE: 'DEVELOPER_SET_STATUS_SET_INIT_FORM_STATE',
  DEVELOPER_SET_STATUS_REQUEST: 'DEVELOPER_SET_STATUS_REQUEST',
  DEVELOPER_SET_STATUS_REQUEST_LOADING: 'DEVELOPER_SET_STATUS_REQUEST_LOADING',
  DEVELOPER_SET_STATUS_REQUEST_SUCCESS: 'DEVELOPER_SET_STATUS_REQUEST_SUCCESS',
  DEVELOPER_SET_STATUS_REQUEST_FAILURE: 'DEVELOPER_SET_STATUS_REQUEST_FAILURE',

  // Revision Detail actions
  REVISION_DETAIL_REQUEST_DATA: 'REVISION_DETAIL_REQUEST_DATA',
  REVISION_DETAIL_LOADING: 'REVISION_DETAIL_LOADING',
  REVISION_DETAIL_REQUEST_DATA__FAILURE: 'REVISION_DETAIL_REQUEST_DATA__FAILURE',
  REVISION_DETAIL_RECEIVE_DATA: 'REVISION_DETAIL_RECEIVE_DATA',
  REVISION_DETAIL_CLEAR_DATA: 'REVISION_DETAIL_CLEAR_DATA',

  REVISION_SUBMIT_APPROVE: 'REVISION_SUBMIT_APPROVE',
  REVISION_APPROVE_SET_FORM_STATE: 'REVISION_APPROVE_SET_FORM_STATE',
  REVISION_SUBMIT_DECLINE: 'REVISION_SUBMIT_DECLINE',
  REVISION_DECLINE_SET_FORM_STATE: 'REVISION_DECLINE_SET_FORM_STATE',

  // App detail modal
  SET_APP_DETAIL_MODAL_STATE_BROWSE: 'SET_APP_DETAIL_MODAL_STATE_BROWSE',
  SET_APP_DETAIL_MODAL_STATE_MANAGE: 'SET_APP_DETAIL_MODAL_STATE_MANAGE',
  SET_APP_DETAIL_MODAL_STATE_INSTALL: 'SET_APP_DETAIL_MODAL_STATE_INSTALL',
  SET_APP_DETAIL_MODAL_STATE_UNINSTALL: 'SET_APP_DETAIL_MODAL_STATE_UNINSTALL',
  SET_APP_DETAIL_MODAL_STATE_SUCCESS: 'SET_APP_DETAIL_MODAL_STATE_SUCCESS',

  // categories
  CATEGORIES_RECEIVE_DATA: 'CATEGORIES_RECEIVE_DATA',

  FORGOT_PASSWORD_SUBMIT_EMAIL: 'FORGOT_PASSWORD_SUBMIT_EMAIL',
  FORGOT_PASSWORD_LOADING: 'FORGOT_PASSWORD_LOADING',

  // setings
  SETTING_FETCH_DEVELOPER_INFO: 'SETTING_FETCH_DEVELOPER_INFO',
  SETTING_FETCH_DEVELOPER_INFO_SUCCESS: 'SETTING_FETCH_DEVELOPER_INFO_SUCCESS',
  SETTING_SHOW_HIDE_LOADING: 'SETTING_SHOW_HIDE_LOADING',
  SETTING_UPDATE_DEVELOPER: 'SETTING_UPDATE_DEVELOPER',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',

  // reset password page
  RESET_PASSWORD_LOADING: 'RESET_PASSWORD_LOADING',
  RESET_PASSWORD: 'RESET_PASSWORD',

  // Installations
  APP_INSTALLATIONS_REQUEST_DATA: 'APP_INSTALLATIONS_REQUEST_DATA',
  APP_INSTALLATIONS_RECEIVE_DATA: 'APP_INSTALLATIONS_RECEIVE_DATA',
  APP_INSTALLATIONS_REQUEST_DATA_FAILURE: 'APP_INSTALLATIONS_REQUEST_DATA_FAILURE',
  APP_INSTALLATIONS_REQUEST_INSTALL: 'APP_INSTALLATIONS_REQUEST_INSTALL',
  APP_INSTALLATIONS_REQUEST_UNINSTALL: 'APP_INSTALLATIONS_REQUEST_UNINSTALL',
  APP_INSTALLATIONS_SET_FORM_STATE: 'APP_INSTALLATIONS_SET_FORM_STATE',

  // Admin stats
  ADMIN_STATS_REQUEST_DATA: 'ADMIN_STATS_REQUEST_DATA',
  ADMIN_STATS_RECEIVE_DATA: 'ADMIN_STATS_RECEIVE_DATA',
  ADMIN_STATS_REQUEST_DATA_FAILURE: 'ADMIN_STATS_REQUEST_DATA_FAILURE',
}

export default ActionTypes
