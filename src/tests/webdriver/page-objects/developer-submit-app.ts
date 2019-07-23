import Base from './base'
import LoginPage from './login'
import * as path from 'path'

class DeveloperSubmitAppPage extends Base {
  get route() {
    return '/developer/submit-app'
  }

  get validFormData() {
    return {
      // generate random string: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
      name: Math.random()
        .toString(36)
        .slice(-5),
      telephone: '0123456789',
      supportEmail: 'nghia@gmail.com',
      launchUri: 'http://google.com',
      iconImageData: '12345',
      homePage: 'http://google.com/abc',
      description:
        'nXXT2zaK807ysWgy8F0WEhIYRP3TgosAtfuiLtQCImoSx0kynxbIF0nkGHU36Oz13kM3DG0Bcsicr8L6eWFKLBg4axlmiOEWcvwHAbBP9LRvoFkCl58k1wjhOExnpaZItEyOT1AXVKv8PE44aMGtVK',
      summary:
        'nXXT2zaK807ysWgy8F0WEhIYRP3TgosAtfuiLtQCImoSx0kynxbIF0nkGHU36Oz13kM3DG0Bcsicr8L6eWFKLBg4axlmiOEWcvwHAbBP9LRvoFkCl58k1wjhOExnpaZItEyOT1AXVKv8PE44aMGtVz'
    }
  }

  get form() {
    return $('[data-test="submit-app-form"]')
  }

  get name() {
    return $('[data-test="submit-app-name"]')
  }

  get description() {
    return $('[data-test="submit-app-description"]')
  }

  get summary() {
    return $('[data-test="submit-app-summary"]')
  }

  get telephone() {
    return $('[data-test="submit-app-phone"]')
  }

  get homePage() {
    return $('[data-test="submit-app-home-page"]')
  }

  get launchUri() {
    return $('[data-test="submit-app-launch-uri"]')
  }

  get supportEmail() {
    return $('[data-test="submit-app-support-email"]')
  }

  get icon() {
    return $('[data-test="submit-ap-icon"]')
  }

  get screenshot1() {
    return $('[data-test="submit-app-screenshoot1"]')
  }

  get screenshot2() {
    return $('[data-test="submit-app-screenshoot2"]')
  }

  get screenshot3() {
    return $('[data-test="submit-app-screenshoot3"]')
  }

  get screenshot4() {
    return $('[data-test="submit-app-screenshoot4"]')
  }

  get submitButton() {
    return $('[data-test="submit-app-button"]')
  }

  get allInputs() {
    return $$('input, textarea')
  }

  get successMessage() {
    return $('[data-test="submit-app-success-message"]')
  }

  get errorMessages() {
    return $$('[data-test="input-error"]')
  }

  get submitAnotherButton() {
    return $('[data-test="submit-another-button"]')
  }

  populateValidForm() {
    this.name.setValue(this.validFormData.name)
    this.supportEmail.setValue(this.validFormData.supportEmail)
    this.telephone.setValue(this.validFormData.telephone)
    this.summary.setValue(this.validFormData.summary)
    this.description.setValue(this.validFormData.description)
    this.launchUri.setValue(this.validFormData.launchUri)
    this.homePage.setValue(this.validFormData.homePage)

    // image
    const file = path.join(__dirname, './image.png')
    browser.chooseFile('[data-test="submit-app-icon"]', file)
    browser.chooseFile('[data-test="submit-app-screenshoot1"]', file)
  }

  submitForm() {
    this.submitButton.click()
  }

  submitAnother() {
    this.submitAnotherButton.click()
  }

  open() {
    LoginPage.logAsDeveloper()
    super.open(this.route)
  }
}

export default new DeveloperSubmitAppPage()
