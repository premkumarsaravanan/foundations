import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import Alert from '@/components/ui/alert'
import { Formik, Form } from 'formik'
import Input from '@/components/form/input'
import loginStyles from '@/styles/pages/login.scss?mod'
import { registerValidate } from '@/utils/form/register'
import { Link } from 'react-router-dom'
import Routes from '../../constants/routes'
import bulma from '@/styles/vendor/bulma'
import Button from '../form/button'

export interface RegisterMappedActions {}

export interface RegisterMappedProps {}

export interface RegisterFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type RegisterProps = RegisterMappedActions & RegisterMappedProps

type FormState = 'done' | 'submitting' | 'error' | 'success'

const { level, levelLeft, levelRight } = bulma
const { container, wrapper, disabled } = loginStyles

export const Register: React.FunctionComponent<RegisterProps> = ({}) => {
  const [formState, setFormState] = React.useState<FormState>('done')
  const isDisabled = formState === 'submitting'
  return (
    <div className={container}>
      <div className={`${wrapper} ${isDisabled ? disabled : ''}`}>
        {formState === 'success' ? (
          <Alert
            dataTest="register-success-message"
            message="Check you email to confirm your account"
            type="success"
            className="mb-0"
          />
        ) : (
          <>
            <Formik
              validate={registerValidate}
              initialValues={
                { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' } as RegisterFormValues
              }
              onSubmit={(values, actions) => {
                setFormState('submitting')
                setTimeout(() => {
                  console.log(values)
                  setFormState('success')
                }, 300)
              }}
              render={props => (
                <Form data-test="register-form">
                  <Input dataTest="register-firstname" type="text" label="First name" id="firstName" name="firstName" />
                  <Input dataTest="register-lastname" type="text" label="Last name" id="lastName" name="lastName" />
                  <Input dataTest="register-email" type="email" label="Email" id="email" name="email" />
                  <Input dataTest="register-password" type="password" label="Password" id="password" name="password" />
                  <Input
                    dataTest="register-confirm-password"
                    type="password"
                    label="Confirm password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <div className={level}>
                    <div className={levelLeft}>
                      <Button type="submit" loading={isDisabled} variant="primary" disabled={isDisabled}>
                        Register
                      </Button>
                    </div>
                    <div className={levelRight}>
                      <Link to={Routes.LOGIN}>Login</Link>
                    </div>
                  </div>
                  {formState === 'error' && (
                    <Alert message="Failed to register" type="danger" dataTest="register-error-message" />
                  )}
                </Form>
              )}
            />
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): RegisterMappedProps => ({})

const mapDispatchToProps = (dispatch: any): RegisterMappedActions => ({})

export default connect()(Register)
