import Base from './base'
import LoginAdminPage from './admin-login'

class ApprovalsPage extends Base {
  get route() {
    return '/admin/approvals'
  }

  get revisionContainer() {
    return $('[data-test="revision-list"]')
  }

  get viewDetailsButton() {
    return $('[data-test*="view-details-button"]')
  }

  get detailModal() {
    return $('[data-test="revision-detail-modal"]')
  }

  get declineForm() {
    return $('[data-test="revision-decline-form"]')
  }

  get approveForm() {
    return $('[data-test="revision-approve-form"]')
  }

  get openApproveModalButton() {
    return $('[data-test="revision-approve-button"]')
  }

  get openDeclineModalButton() {
    return $('[data-test="revision-decline-button"]')
  }

  get cancelApproveModalButton() {
    return $('[data-test="revision-approve-cancel"]')
  }

  get cancelDeclineModalButton() {
    return $('[data-test="revision-decline-cancel"]')
  }

  get rejectionReasonTextarea() {
    return $('[data-test="revision-rejection-reason"]')
  }

  get approvalSubmitButton() {
    return $('[data-test="revision-approve-submit"]')
  }

  get declineSubmitButton() {
    return $('[data-test="revision-decline-submit"]')
  }

  get errorMessages() {
    return $$('[data-test="input-error"]')
  }

  get declineSuccessMessage() {
    return $('[data-test="decline-revision-success-message"]')
  }

  get approveSuccessMessage() {
    return $('[data-test="approve-revision-success-message"]')
  }

  get isListedCurrentCheckbox() {
    return $('[data-test="revision-diff-isListed"] [data-test="current"]')
  }

  get isListedChangedCheckbox() {
    return $('[data-test="revision-diff-isListed"] [data-test="changed"]')
  }

  getAppViewDetailButtonbyId(appId: string) {
    return $(`[data-test="view-details-button_${appId}"]`)
  }

  populateValidDeclineForm() {
    this.rejectionReasonTextarea.setValue('any reason')
  }

  submitDecline() {
    this.openDeclineModalButton.click()
    this.declineSubmitButton.waitForVisible()
    this.populateValidDeclineForm()
    this.declineSubmitButton.click()
  }

  submitApproval() {
    this.openApproveModalButton.click()
    this.approvalSubmitButton.waitForVisible()
    this.approvalSubmitButton.click()
  }

  open() {
    LoginAdminPage.login()
    super.open(this.route)
  }
}

export default new ApprovalsPage()
