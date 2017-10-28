// FIXME: this routes configuration might be deprecated by react-router v4
import Base from './components/Base.jsx';
import Home from './components/Home.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignupPage from './containers/SignupPage.jsx';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/signup',
      component: SignupPage,
    },
  ],
};

export default routes;
