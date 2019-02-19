export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // admin
  {
    path: '/',
    component: '../layouts/AdminLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      { path: '/', redirect: '/admin/setting/folder' },
      {
        path: '/admin/setting/folder',
        name: 'setting.folder',
        icon: 'folder',
        component: './SettingFolder/SettingFolder'
      },
      {
        path: '/admin/setting/team',
        name: 'setting.team',
        icon: 'team',
        component: './SettingTeam/SettingTeam'
      },
    ],
  },
  
  // home
  // {
  //   path: '/',
  //   component: '../layouts/PrimaryLayout/PrimaryLayout',
  //   authority: ['admin', 'user'],
  //   routes: [
  //     { path: '/', redirect: '/mail/team/1/folder/0' },
  //     {
  //       path: '/mail/team/:teamId/folder/:folderId',
  //       component: './EmailList/EmailList',
  //     },
  //     {
  //       path: '/mail/team/:teamId/folder/:folderId/detail/:id',
  //       name: 'email.detail',
  //       component: './EmailDetail/EmailDetail'
  //     },
  //     {
  //       path: '/mail/team/:teamId/folder/:folderId/search',
  //       component: './EmailList/EmailList',
  //     },
  //     {
  //       redirect: '/mail/team/1/folder/0'
  //     },
  //   ],
  // },
];
