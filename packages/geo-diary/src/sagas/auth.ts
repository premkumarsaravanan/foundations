import { takeLatest, put, call, all } from '@redux-saga/core/effects'
import { Action } from '@/types/core.ts'
import ActionTypes from '@/constants/action-types'
import { authLoginSuccess, authLoginFailure } from '@/actions/auth'
import { LoginParams, LoginSession, setUserSession, removeSession, redirectToLogout } from '@reapit/cognito-auth'
import { COOKIE_SESSION_KEY_GEO_DIARY } from '../constants/api'
import store from '@/core/store'
import { logger } from 'logger'

export const doLogin = function*({ data }: Action<LoginParams>) {
  try {
    const loginSession: LoginSession | null = yield call(setUserSession, data)

    if (loginSession) {
      yield put(authLoginSuccess(loginSession))
    } else {
      yield put(authLoginFailure())
    }
  } catch (err) {
    logger(err)
    yield put(authLoginFailure())
  }
}

export const doLogout = function*() {
  try {
    yield call(store.purgeStore)
    yield call(removeSession, COOKIE_SESSION_KEY_GEO_DIARY)
    yield call(redirectToLogout, process.env.COGNITO_CLIENT_ID_GEO_DIARY as string, `${window.location.origin}/login`)
  } catch (err) {
    logger(err)
  }
}

export const loginListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGIN, doLogin)
}

export const logoutListen = function*() {
  yield takeLatest(ActionTypes.AUTH_LOGOUT, doLogout)
}

const authSaga = function*() {
  yield all([loginListen(), logoutListen()])
}

export default authSaga
