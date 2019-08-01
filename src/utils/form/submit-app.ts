import { CreateAppModel } from '@/types/marketplace-api-schema'
import validateRequire from '../validators/validate-require'
import validateEmail from '../validators/validate-email'

export type SubmitAppFormErrorKeys =
  | 'name'
  | 'telephone'
  | 'supportEmail'
  | 'launchUri'
  | 'iconImageData'
  | 'homePage'
  | 'description'
  | 'summary'
  | 'screen1ImageData'

export const validate = (values: CreateAppModel) => {
  let errors = validateRequire<CreateAppModel, SubmitAppFormErrorKeys>({
    values,
    currentErrors: {},
    keys: [
      'name',
      'telephone',
      'supportEmail',
      'launchUri',
      'iconImageData',
      'homePage',
      'description',
      'summary',
      'screen1ImageData'
    ]
  })

  errors = validateEmail({
    values,
    currentErrors: errors,
    keys: ['supportEmail']
  })

  return errors
}
