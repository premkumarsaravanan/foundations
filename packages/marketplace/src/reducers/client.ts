import { Action } from '../types/core'
import { isType } from '../utils/actions'
import { clientLoading, clientReceiveData, clientClearData, clientRequestDataFailure } from '../actions/client'
import { PagedResultAppSummaryModel_, AppSummaryModel } from '@reapit/foundations-ts-definitions'

export interface ClientItem {
  apps: PagedResultAppSummaryModel_
  featuredApps?: AppSummaryModel[]
}

export interface ClientState {
  loading: boolean
  clientData: ClientItem | null
}

export interface ClientParams {
  page?: number
  search?: string
  searchBy?: string
  category?: string
}

export const defaultState: ClientState = {
  loading: false,
  clientData: null,
}

const clientReducer = (state: ClientState = defaultState, action: Action<any>): ClientState => {
  if (isType(action, clientLoading)) {
    return {
      ...state,
      loading: action.data,
    }
  }

  if (isType(action, clientReceiveData)) {
    return {
      ...state,
      loading: false,
      clientData: action.data || null,
    }
  }

  if (isType(action, clientClearData)) {
    return {
      ...state,
      loading: false,
      clientData: action.data,
    }
  }

  if (isType(action, clientRequestDataFailure)) {
    return {
      ...state,
      loading: false,
    }
  }

  return state
}

export default clientReducer
