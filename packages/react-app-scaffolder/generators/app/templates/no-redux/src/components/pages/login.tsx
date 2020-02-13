import * as React from 'react'
<<<<<<< HEAD
import { Redirect } from 'react-router-dom'

import Routes from '@/constants/routes'
import { Button, H1, Level } from '@reapit/elements'
<% if (stylesSolution == 'sass') { %>import loginStyles from '@/styles/pages/login.scss?mod'<%}%>
<% if (stylesSolution == 'styledComponents') { %>import { Container, Wrapper, ImageContainer } from './__styles__/login'<%}%>
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { useAuthContext } from '@/context/authContext'
import { redirectToOAuth } from '@reapit/cognito-auth'

export const Login: React.FunctionComponent = () => {
  const cognitoClientId = 'process.env.COGNITO_CLIENT_ID'
  <% if (stylesSolution == 'sass') { %>const { wrapper, container, image } = loginStyles<%}%>

  const { loginSession, refreshSession } = useAuthContext()
  const hasSession = !!loginSession && !!refreshSession
=======
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { Dispatch } from 'redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import { authLogin } from '@/actions/auth'
import Routes from '@/constants/routes'
import { LOGIN_TYPE } from '@/constants/auth'
import { Input, Button, H1, Level, Alert, isEmail } from '@reapit/elements'
import { LoginParams } from '@reapit/cognito-auth'
import logoImage from '@/assets/images/reapit-graphic.jpg'
import { Container, Wrapper, ImageContainer } from './__styles__/login'

export interface LoginMappedActions {
  login: (params: LoginParams) => void
}

export interface LoginMappedProps {
  hasSession: boolean
  error: boolean
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface LoginFormError {
  email?: string
  password?: string
}

export function validate(values: LoginFormValues) {
  let errors = {} as LoginFormError

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}

export type LoginProps = LoginMappedActions & LoginMappedProps & RouteComponentProps

export const onSubmitHandler = (setIsSubmitting: any, login: any, values: LoginFormValues) => {
  const { email, password } = values

  setIsSubmitting(true)
  login({ userName: email, password, loginType: LOGIN_TYPE.CLIENT } as LoginParams)
}

export const Login: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { hasSession, error, login } = props

  React.useEffect(() => {
    if (error) {
      setIsSubmitting(false)
    }
  }, [error])
>>>>>>> temp

  if (hasSession) {
    return <Redirect to={Routes.AUTHENTICATED} />
  }

  return (
<<<<<<< HEAD
    <% if (stylesSolution == 'sass') { %><div className={container}>
      <div className={wrapper}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to <%= name %></p><%}%>

    <% if (stylesSolution == 'styledComponents') { %><Container>
      <Wrapper>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to <%= name %></p><%}%>

        <Level>
          <Button fullWidth type="submit" variant="primary" onClick={() => redirectToOAuth(cognitoClientId)}>
            Login
          </Button>
        </Level>

        <% if (stylesSolution == 'sass') { %>
          </div>

        <div className={image}>
          <img src={logoImage} alt="Reapit Graphic" />
        </div>
      </div>
        <%}%>
        <% if (stylesSolution == 'styledComponents') { %>
          </Wrapper>

          <ImageContainer>
            <img src={logoImage} alt="Reapit Graphic" />
          </ImageContainer>
        </Container>
        <%}%>
  )
}

export default Login
=======
    <Container>
      <Wrapper disabled={isSubmitting}>
        <H1 isCentered>Sign in</H1>
        <p className="pb-8">Welcome to <%= name %></p>

        <Formik
          validate={validate}
          initialValues={{ email: '', password: '' } as LoginFormValues}
          onSubmit={values => onSubmitHandler(setIsSubmitting, login, values)}
          render={() => (
            <Form data-test="login-form">
              <Input
                dataTest="login-email"
                type="email"
                labelText="Email"
                id="email"
                name="email"
                placeholder="name@address.com"
              />
              <Input
                dataTest="login-password"
                type="password"
                labelText="Password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />

              <Level>
                <Button type="submit" loading={isSubmitting} variant="primary" disabled={isSubmitting}>
                  Login
                </Button>
              </Level>

              {error && <Alert message="Login failed, user credentials not recognised" type="danger" />}
            </Form>
          )}
        />
      </Wrapper>

      <ImageContainer>
        <img src={logoImage} alt="Reapit Graphic" />
      </ImageContainer>
    </Container>
  )
}

const mapStateToProps = (state: ReduxState): LoginMappedProps => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  error: state.auth.error
})

const mapDispatchToProps = (dispatch: Dispatch): LoginMappedActions => ({
  login: (params: LoginParams) => dispatch(authLogin(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
>>>>>>> temp