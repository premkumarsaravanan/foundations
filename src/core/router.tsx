import * as React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import loadable from '@loadable/component'
import RouteFetcher from '../components/hocs/route-fetcher'
import Routes from '../constants/routes'
import PrivateRoute from '../core/private-route'

const Home = loadable(() => import('../components/pages/home'))
const Item = loadable(() => import('../components/pages/item'))
const Login = loadable(() => import('../components/pages/login'))
const Client = loadable(() => import('../components/pages/client'))
const Developer = loadable(() => import('../components/pages/developer'))
const Register = loadable(() => import('../components/pages/register'))

const Router = () => (
  <BrowserRouter>
    <Route path={Routes.HOME} exact render={props => <RouteFetcher routerProps={props} Component={Home} />} />
    <Route path={Routes.ITEM} render={props => <RouteFetcher routerProps={props} Component={Item} />} />
    <Route path={Routes.LOGIN} exact render={props => <RouteFetcher routerProps={props} Component={Login} />} />
    <Route path={Routes.REGISTER} exact render={props => <RouteFetcher routerProps={props} Component={Register} />} />
    <PrivateRoute path={Routes.CLIENT} exact component={Client} />
    <PrivateRoute path={Routes.DEVELOPER} exact component={Developer} />
  </BrowserRouter>
)

export default Router
