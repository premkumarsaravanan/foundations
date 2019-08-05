import { oc } from 'ts-optchain'
import fetcher from '../utils/fetcher'
import { URLS, PLATFORM_HEADERS, MARKETPLACE_HEADERS, REAPIT_API_BASE_URL } from '../constants/api'
import {
  developerLoading,
  developerReceiveData,
  developerSetFormState,
  developerRequestDataFailure
} from '../actions/developer'
import { put, fork, takeLatest, all, call, select } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { CreateDeveloperModel } from '../types/marketplace-api-schema'
import { Action, ReduxState } from '../types/core'
import { APPS_PER_PAGE } from '@/constants/paginator'

export const selectDeveloperId = (state: ReduxState) => {
  return oc<ReduxState>(state).auth.loginSession.loginIdentity.developerId
}

export const developerDataFetch = function*({ data: page }) {
  yield put(developerLoading(true))

  try {
    const developerId = yield select(selectDeveloperId)
    if (!developerId) {
      throw new Error('Developer id is not exists')
    }

    const response = yield call(fetcher, {
      url: `${URLS.apps}?developerId=${developerId}&PageNumber=${page}&PageSize=${APPS_PER_PAGE}`,
      method: 'GET',
      api: REAPIT_API_BASE_URL,
      headers: MARKETPLACE_HEADERS
    })
    if (response) {
      yield put(developerReceiveData({ data: response }))
    } else {
      yield put(developerRequestDataFailure())
    }
  } catch (err) {
    console.error(err.message)
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const developerCreate = function*({ data }: Action<CreateDeveloperModel>) {
  yield put(developerSetFormState('SUBMITTING'))

  try {
    const regResponse: true | undefined = yield call(fetcher, {
      url: URLS.developerCreate,
      api: REAPIT_API_BASE_URL,
      method: 'POST',
      body: data,
      headers: PLATFORM_HEADERS,
      isPrivate: false
    })
    const status = regResponse ? 'SUCCESS' : 'ERROR'
    yield put(developerSetFormState(status))
  } catch (err) {
    console.error(err.message)
    yield put(developerSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const developerRequestDataListen = function*() {
  yield takeLatest<Action<number>>(ActionTypes.DEVELOPER_REQUEST_DATA, developerDataFetch)
}

export const developerCreateListen = function*() {
  yield takeLatest(ActionTypes.DEVELOPER_CREATE, developerCreate)
}

const developerSagas = function*() {
  yield all([fork(developerRequestDataListen), fork(developerCreateListen)])
}

export default developerSagas
