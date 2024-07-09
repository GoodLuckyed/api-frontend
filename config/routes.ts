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
      { path: '/admin', redirect: '/admin/interface/list' },
      { path: '/admin/interface/list', name: '接口管理', component: './Admin/InterfaceInfoList'},
      { path: '/admin/user/list', name: '用户管理', component: './Admin/UserList'},
    ],
  },
  { name: '查询表格', icon: 'table', path: '/list', component: './InterfaceInfo' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
