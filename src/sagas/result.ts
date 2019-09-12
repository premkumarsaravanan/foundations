import { put, call, fork, takeLatest, all } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import { Action } from '@/types/core'
import { fetcher } from '@reapit/elements'
import { URLS, REAPIT_API_BASE_URL, CONTACTS_HEADERS } from '@/constants/api'
import { resultReceiveData, resultRequestDataFailure, ContactsParams } from '@/actions/result'
import { queryParams } from '@/utils/query-params'
import { CONTACTS_PER_PAGE } from '@/constants/paginator'

export const resultFetch = function*(params: Action<ContactsParams>) {
  try {
    const response = yield call(fetcher, {
      url: `${URLS.contacts}/?${queryParams({ ...params.data, pageSize: CONTACTS_PER_PAGE })}`,
      api: REAPIT_API_BASE_URL,
      method: 'GET',
      headers: CONTACTS_HEADERS
    })
    yield put(resultReceiveData(response))
  } catch (err) {
    yield put(resultRequestDataFailure())
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const resultListen = function*() {
  yield takeLatest<Action<ContactsParams>>(ActionTypes.RESULT_REQUEST_DATA, resultFetch)
}

const resultSagas = function*() {
  yield all([fork(resultListen)])
}

export default resultSagas
