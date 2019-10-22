import { submitChecksSetFormState } from '../actions/submit-checks'
import { put, fork, all, takeLatest, delay, call } from '@redux-saga/core/effects'
import ActionTypes from '../constants/action-types'
import { Action } from '../types/core'
import { errorThrownServer } from '../actions/error'
import errorMessages from '../constants/error-messages'
import routes from '@/constants/routes'
import { history } from '@/core/router'
import { DynamicLinkParams, navigateDynamicApp } from '@reapit/elements'

export const submitCheck = function*({
  data: { id, dynamicLinkParams }
}: Action<{ id: string; dynamicLinkParams: DynamicLinkParams }>) {
  yield put(submitChecksSetFormState('SUBMITTING'))
  try {
    yield delay(2000)
    yield put(submitChecksSetFormState('SUCCESS'))
    if (dynamicLinkParams.appMode === 'WEB') {
      yield history.push(routes.CHECKLIST_DETAIL_ID_SUCCESS.replace(':id', id))
    } else {
      yield call(navigateDynamicApp, dynamicLinkParams)
    }
  } catch (err) {
    console.error(err)
    yield put(submitChecksSetFormState('ERROR'))
    yield put(
      errorThrownServer({
        type: 'SERVER',
        message: errorMessages.DEFAULT_SERVER_ERROR
      })
    )
  }
}

export const submitCheckListen = function*() {
  yield takeLatest<Action<{ id: string; dynamicLinkParams: DynamicLinkParams }>>(ActionTypes.SUBMIT_CHECKS, submitCheck)
}

export const submitCheckSagas = function*() {
  yield all([fork(submitCheckListen)])
}

export default submitCheckSagas
