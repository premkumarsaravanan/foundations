import { STEPS } from './../components/ui/modal/modal'
import { ReduxState } from '@/types/core'
import { oc } from 'ts-optchain'

export const selectCheckListDetailFormStatus = (state: ReduxState, formName: string) => {
  let result: boolean = false

  switch (formName) {
    case STEPS.PROFILE:
      result = oc(state).checklistDetail.status.profile(false)
      break

    case STEPS.PRIMARY_IDENTIFICATION:
      result = oc(state).checklistDetail.status.primaryId(false)
      break

    case STEPS.SECONDARY_IDENTIFICATION:
      result = oc(state).checklistDetail.status.secondaryId(false)
      break

    case STEPS.ADDRESS_INFORMATION:
      result = oc(state).checklistDetail.status.addresses(false)
      break

    case STEPS.DECLARATION_RISK_MANAGEMENT:
      result = oc(state).checklistDetail.status.declarationRisk(false)
      break

    default:
  }

  return result
}

export const selectCheckListDetailContact = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.contact(null)
}

export const selectCheckListDetailIsSubmitting = (state: ReduxState) => {
  return oc(state).checklistDetail.isSubmitting(false)
}

export const selectCheckListDetailIdCheck = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck(null)
}

export const selectCheckListDetailPrimaryIdUrl = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck.metadata.primaryIdUrl()
}

export const selectCheckListDetailSecondaryIdUrl = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck.metadata.secondaryIdUrl()
}

export const selectCheckListDetailPrimaryId = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck.documents[0]()
}

export const selectCheckListDetailSecondaryId = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.idCheck.documents[1]()
}

export const selectDeclarationRisk = (state: ReduxState) => {
  return oc(state).checklistDetail.checklistDetailData.contact.metadata.declarationRisk({})
}
