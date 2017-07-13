// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import { Route, RouteProps } from 'react-router';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export interface IExtendedRouteProps extends RouteProps {
  name?: string;
}

export default function createRoutes(store): IExtendedRouteProps[] {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);
  return [
    {
      path: '/mohit',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('app/containers/HomePage/reducer'),
          System.import('app/containers/HomePage/sagas'),
          System.import('app/containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {

      path: '/',
      name: 'Mohit',
      getComponent(nextState, cb) {
        System.import('app/containers/Mohit')
        .then(loadModule(cb))
        .catch(errorLoading);
      },
    }, {
      path: '/features',
      name: 'features',
      getComponent(nextState, cb) {
        System.import('app/containers/FeaturePage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('app/containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
