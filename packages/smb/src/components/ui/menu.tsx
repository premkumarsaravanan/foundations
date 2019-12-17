import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { LoginMode } from '@reapit/cognito-auth'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud } from 'react-icons/fa'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  mode: LoginMode
): MenuConfig => {
  return {
    defaultActiveKey: 'LOGO',
    mode,
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO'
      },
      {
        title: 'Apps',
        key: 'APPS',
        icon: <FaCloud className="nav-item-icon" />,
        callback: () =>
          (window.location.href = !window.location.href.includes('dev')
            ? 'https://marketplace.reapit.com/client/installed'
            : 'https://dev.marketplace.reapit.com/client/installed'),
        type: 'PRIMARY'
      },
      {
        title: 'Logout',
        key: 'LOGOUT',
        callback: logoutCallback,
        icon: <FaSignOutAlt className="nav-item-icon" />,
        type: 'SECONDARY'
      }
    ]
  }
}

export interface MenuMappedActions {
  logout: () => void
}

export interface MenuMappedState {
  mode: LoginMode
}

export type MenuProps = MenuMappedActions & MenuMappedState & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, location, mode }) => {
  const logoutCallback = () => logout()
  const menuConfigs = generateMenuConfig(logoutCallback, location, mode)
  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu)