

//返回示例
export const returnExample = '{\n' +
  '   "code" : 0,\n' +
  '   "data" : {},\n' +
  '   "message" : "ok"\n' +
'}'

//默认请求参数
export const requestParameters = [{
  fieldName: '无',
  type: "string",
  desc: "无",
  required: '否'
}]

//默认返回参数
export const responseParameters = [{
  fieldName: 'code',
  type: "int",
  desc: '返回码',
  required: '是'
},{
  fieldName: 'data',
  type: "Object",
  desc: "返回数据",
  required: '是'
}, {
  fieldName: 'massage',
  type: "string",
  desc: "返回码描述",
  required: '是'
}]

