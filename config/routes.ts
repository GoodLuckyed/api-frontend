export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/interface/list',
    name: '接口广场',
    icon: 'RedditOutlined',
    component: './InterfaceSquare',
  },
  {
    path: '/interface_info/:id',
    name: '接口详情',
    component: './InterfaceInfo',
    hideInMenu: true
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './InterfaceInfo' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
