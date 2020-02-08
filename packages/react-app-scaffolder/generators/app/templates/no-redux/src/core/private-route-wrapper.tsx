import * as React from 'react'
<<<<<<< HEAD
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Menu from '@/components/ui/menu'
import { Loader, AppNavContainer, Section } from '@reapit/elements'
import { RefreshParams, getTokenFromQueryString, redirectToOAuth } from '@reapit/cognito-auth'
import { useAuthContext } from '@/context/authContext'

const { Suspense } = React

export type PrivateRouteWrapperProps = RouteComponentProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children, location }) => {
  const cognitoClientId = 'process.env.COGNITO_CLIENT_ID'
  const refreshParams: RefreshParams | null = getTokenFromQueryString(location.search, cognitoClientId)

  const { loginSession, refreshSession, setRefreshSession } = useAuthContext()
  const hasSession = !!loginSession && !!refreshSession
=======
import { RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'
import { Loader, AppNavContainer, Section } from '@reapit/elements'
import { RefreshParams, getTokenFromQueryString } from '@reapit/cognito-auth'
import { authSetRefreshSession } from '../actions/auth'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'
import { redirectToOAuth } from '@reapit/cognito-auth'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setRefreshSession: (refreshParams: RefreshParams) => void
}

export interface PrivateRouteWrapperConnectState {
  hasSession: boolean
  isDesktopMode: boolean
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectState &
  PrivateRouteWrapperConnectActions &
  RouteComponentProps & {
    path: string
  }

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  setRefreshSession,
  children,
  location,
  isDesktopMode,
  hasSession,
}) => {
  const cognitoClientId = process.env.COGNITO_CLIENT_ID_GEO_DIARY as string
  const refreshParams = getTokenFromQueryString(location.search, cognitoClientId)
>>>>>>> temp

  if (refreshParams && !hasSession) {
    setRefreshSession(refreshParams)
    return null
  }

  if (!hasSession) {
    redirectToOAuth(cognitoClientId)
    return null
  }
<<<<<<< HEAD
  return (
    <AppNavContainer>
=======

  const { isDesktop } = pageContainerStyles

  return (
    <AppNavContainer className={`${isDesktopMode ? isDesktop : ''}`}>
>>>>>>> temp
      <Menu />
      <Suspense
        fallback={
          <Section>
            <Loader />
          </Section>
        }
      >
        {children}
      </Suspense>
    </AppNavContainer>
  )
}

<<<<<<< HEAD
export default withRouter(PrivateRouteWrapper)
=======
const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  isDesktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP',
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
>>>>>>> temp
