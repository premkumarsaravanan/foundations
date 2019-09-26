import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'
import Routes from '../constants/routes'
import { RefreshParams, Loader, getTokenFromQueryString } from '@reapit/elements'
import { authSetRefreshSession } from '../actions/auth'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'
import { oc } from 'ts-optchain'

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
  hasSession
}) => {
  const desktopLogin = getTokenFromQueryString(location.search)

  if (desktopLogin && !isDesktopMode) {
    setRefreshSession(desktopLogin)
  }

  if (!hasSession) {
    return <Redirect to={Routes.LOGIN} />
  }

  const { menuContainer, pageContainer, pageWrapper, isDesktop } = pageContainerStyles

  return (
    <div className={pageWrapper}>
      <div className={`${menuContainer} ${isDesktopMode ? isDesktop : ''}`}>
        <Menu />
      </div>
      <main className={`${pageContainer} ${isDesktopMode ? isDesktop : ''}`}>
        <Suspense
          fallback={
            <div className="pt-5">
              <Loader />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  isDesktopMode: oc(state).auth.refreshSession.mode() === 'DESKTOP'
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRouteWrapper)
)
