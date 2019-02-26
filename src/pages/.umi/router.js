import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/datnt/Downloads/warehouse-react/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
    "routes": [
      {
        "path": "/user",
        "redirect": "/user/login",
        "exact": true
      },
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": dynamic({ loader: () => import('../User/Register'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/datnt/Downloads/warehouse-react/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/AdminLayout'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/dashboard",
        "exact": true
      },
      {
        "path": "/admin/setting/folder",
        "name": "setting.folder",
        "icon": "folder",
        "component": dynamic({ loader: () => import('../SettingFolder/SettingFolder'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/admin/setting/team",
        "name": "setting.team",
        "icon": "team",
        "component": dynamic({ loader: () => import('../SettingTeam/SettingTeam'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "component": dynamic({ loader: () => import('../Dashboard/Dashboard'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/products",
        "name": "qlsp",
        "icon": "appstore",
        "component": dynamic({ loader: () => import('../QuanLySanPham/QuanLySanPham'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/warehouse/import",
        "name": "qlnk",
        "icon": "caret-down",
        "component": dynamic({ loader: () => import('../QuanLyNhapKho/QuanLyNhapKho'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/warehouse/detail/:detailId",
        "icon": "caret-down",
        "component": dynamic({ loader: () => import('../ChiTietDon/ChiTietDon'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/warehouse/duyet/:detailId",
        "icon": "caret-down",
        "component": dynamic({ loader: () => import('../ChiTietDuyet/ChiTietDuyet'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/warehouse/export",
        "name": "qlxk",
        "icon": "caret-up",
        "component": dynamic({ loader: () => import('../QuanLyXuatKho/QuanLyXuatKho'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/admin/users",
        "name": "dsnd",
        "icon": "team",
        "component": dynamic({ loader: () => import('../DanhSachNguoiDung/DanhSachNguoiDung'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/admin/warehouses",
        "name": "dskh",
        "icon": "dashboard",
        "component": dynamic({ loader: () => import('../DanhSachKhoHang/DanhSachKhoHang'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/admin/duyet",
        "name": "dd",
        "icon": "dashboard",
        "component": dynamic({ loader: () => import('../DuyetDon/DuyetDon'), loading: require('/Users/datnt/Downloads/warehouse-react/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/datnt/Downloads/warehouse-react/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/datnt/Downloads/warehouse-react/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
