import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__UserLayout" */'../../layouts/UserLayout'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Login" */'../User/Login'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__Register" */'../User/Register'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__User__models__register.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import(/* webpackChunkName: "p__User__RegisterResult" */'../User/RegisterResult'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../../layouts/BasicLayout'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard/analysis",
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "name": "analysis",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Dashboard/Analysis'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "name": "monitor",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Dashboard/Monitor'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Dashboard__models__activities.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/activities.js').then(m => { return { namespace: 'activities',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__chart.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/chart.js').then(m => { return { namespace: 'chart',...m.default}}),
  import(/* webpackChunkName: 'p__Dashboard__models__monitor.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Dashboard/models/monitor.js').then(m => { return { namespace: 'monitor',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Dashboard/Workplace'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/form",
        "icon": "form",
        "name": "form",
        "routes": [
          {
            "path": "/form/basic-form",
            "name": "basicform",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/BasicForm'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/form/step-form",
            "name": "stepform",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/StepForm'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/form/step-form",
                "redirect": "/form/step-form/info",
                "exact": true
              },
              {
                "path": "/form/step-form/info",
                "name": "info",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/StepForm/Step1'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/form/step-form/confirm",
                "name": "confirm",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/StepForm/Step2'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/form/step-form/result",
                "name": "result",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/StepForm/Step3'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/form/advanced-form",
            "name": "advancedform",
            "authority": [
              "admin"
            ],
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Forms__models__form.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Forms/models/form.js').then(m => { return { namespace: 'form',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Forms/AdvancedForm'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [
          {
            "path": "/list/table-list",
            "name": "searchtable",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/TableList'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/basic-list",
            "name": "basiclist",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/BasicList'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/card-list",
            "name": "cardlist",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/CardList'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/list/search",
            "name": "searchlist",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/List'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/list/search",
                "redirect": "/list/search/articles",
                "exact": true
              },
              {
                "path": "/list/search/articles",
                "name": "articles",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/Articles'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/list/search/projects",
                "name": "projects",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/Projects'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/list/search/applications",
                "name": "applications",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__List__models__rule.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/List/models/rule.js').then(m => { return { namespace: 'rule',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../List/Applications'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/profile",
        "name": "profile",
        "icon": "profile",
        "routes": [
          {
            "path": "/profile/basic",
            "name": "basic",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Profile__models__profile.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Profile/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Profile/BasicProfile'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/profile/advanced",
            "name": "advanced",
            "authority": [
              "admin"
            ],
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Profile__models__profile.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Profile/models/profile.js').then(m => { return { namespace: 'profile',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Profile/AdvancedProfile'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "result",
        "icon": "check-circle-o",
        "path": "/result",
        "routes": [
          {
            "path": "/result/success",
            "name": "success",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Result/Success'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/result/fail",
            "name": "fail",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Result/Error'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "routes": [
          {
            "path": "/exception/403",
            "name": "not-permission",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Exception__models__error.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Exception/403'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Exception__models__error.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Exception/404'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Exception__models__error.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Exception/500'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/trigger",
            "name": "trigger",
            "hideInMenu": true,
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Exception__models__error.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Exception/TriggerException'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
          {
            "path": "/account/center",
            "name": "center",
            "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Center/Center'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/center",
                "redirect": "/account/center/articles",
                "exact": true
              },
              {
                "path": "/account/center/articles",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Center/Articles'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Center/Applications'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Center/Projects'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/account/settings",
            "name": "settings",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/Info'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/settings",
                "redirect": "/account/settings/base",
                "exact": true
              },
              {
                "path": "/account/settings/base",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/BaseView'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/security",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/SecurityView'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/binding",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/BindingView'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/settings/notification",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'p__Account__Settings__models__geographic.js' */'/Users/datnt/Project/template ReactJS/ant-design-pro/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import(/* webpackChunkName: "layouts__BasicLayout" */'../Account/Settings/NotificationView'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__404" */'../404'),
  LoadingComponent: require('/Users/datnt/Project/template ReactJS/ant-design-pro/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/datnt/Project/template ReactJS/ant-design-pro/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
