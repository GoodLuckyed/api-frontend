//通用枚举

export const InterfaceRequestMethodEnum:any = {
  GET: 'blue',
  POST: 'red',
  PUT: 'green',
  DELETE: 'orange'
}

export const InterfaceStatusEnum:any = {
  0: '已关闭',
  1: '已上线',
  2: '审核中'
}

// 错误码参照
export const errorcode = [
  {
    code: 0,
    name: 'SUCCESS',
    desc: 'ok',
  },
  {
    code: 40000,
    name: 'PARAMS_ERROR',
    desc: '请求参数错误',
  },
  {
    code: 40101,
    name: 'NO_AUTH_ERROR',
    desc: '无权限',
  },
  {
    code: 40300,
    name: 'FORBIDDEN_ERROR',
    desc: '禁止访问',
  },
  {
    code: 40400,
    name: 'NOT_FOUND_ERROR',
    desc: '请求数据不存在',
  },
  {
    code: 50000,
    name: 'SYSTEM_ERROR',
    desc: '系统内部异常',
  },
  {
    code: 50001,
    name: 'OPERATION_ERROR',
    desc: '操作失败',
  },
]
