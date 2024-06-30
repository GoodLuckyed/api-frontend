import type {ProColumns, ProFormColumnsType} from '@ant-design/pro-components';
import {Link} from "@@/exports";
import {Tag} from "antd";
import {InterfaceRequestMethodEnum} from "@/enum/commonEnum";
import React from "react";
import ParamsTable from "@/components/ParamsTable";

export const requestParam: ProColumns[] = [
  {
    title: '参数名称',
    dataIndex: 'fieldName',
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项',
        },
      ],
    },
  },
  {
    title: '必填',
    valueType: "select",
    dataIndex: 'required',
    valueEnum: {
      "是": {text: "是"},
      "否": {text: "否"},
    }, formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项',
        },
      ],
    },
  },
  {
    title: '参数类型',
    dataIndex: 'type',
    valueEnum: {
      "int": {text: "int"},
      "string": {text: "string"},
      "long": {text: "long"},
      "boolean": {text: "boolean"},
      "double": {text: "double"},
      "object": {text: "object"},
    },
    valueType: "select",
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项',
        },
      ],
    },
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
]

export const  defaultNewRequestColumn = {
  fieldName: '',
  required: "是",
  type: "string",
  desc: "",
}

export const responseParam: ProColumns[] = [
  {
    title: '参数名称',
    dataIndex: 'fieldName',
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项',
        },
      ],
    },
  },
  {
    title: '参数类型',
    dataIndex: 'type',
    valueEnum: {
      "int": {text: "int"},
      "string": {text: "string"},
      "long": {text: "long"},
      "boolean": {text: "boolean"},
      "double": {text: "double"},
      "object": {text: "object"},
    },
    valueType: "select",
    formItemProps: {
      rules: [
        {
          required: true,
          whitespace: true,
          message: '此项是必填项',
        },
      ],
    },
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
]

export const defaultNewResponseColumn = {
  fieldName: '',
  type: "string",
  desc: "",
}

const InterfaceInfoColumns: ProColumns<API.InterfaceInfo>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id',
  },
  {
    title: '接口名称',
    dataIndex: 'name',
    valueType: 'text',
    key: 'name',
    ellipsis: true,
    copyable: true,
    render: (_, record) => {
      return (
        <Link key={record.id} to={`/interface_info/${record.id}`}>
          {record.name}
        </Link>
      );
    },
  },
  {
    title: '接口描述',
    dataIndex: 'description',
    valueType: 'textarea',
    copyable: true,
    ellipsis: true,
    key: 'description',
  },
  {
    title: '接口地址',
    dataIndex: 'url',
    valueType: 'text',
    copyable: true,
    ellipsis: true,
    key: 'url',
  },
  {
    title: '请求参数',
    dataIndex: 'requestParams',
    valueType: 'text',
    copyable: true,
    ellipsis: true,
    search: false,
    key: 'requestParams',
  },
  {
    title: '响应参数',
    dataIndex: 'responseParams',
    valueType: 'text',
    copyable: true,
    ellipsis: true,
    search: false,
    key: 'responseParams',
  },
  {
    title: '请求类型',
    dataIndex: 'method',
    hideInForm: true,
    filters: true,
    onFilter: true,
    width: 100,
    key: 'method',
    render: (_, record) => {
      return (
        <Tag color={InterfaceRequestMethodEnum[record?.method ?? 'default']}>
          {record?.method}
        </Tag>
      )
    },
    valueEnum: {
      GET: {
        text: 'GET',
      },
      POST: {
        text: 'POST',
      },
      PUT: {
        text: 'PUT',
      },
      DELETE: {
        text: 'DELETE',
      }
    },
  },
  {
    title: '请求头',
    dataIndex: 'requestHeader',
    valueType: 'text',
    copyable: true,
    ellipsis: true,
    search: false,
    width: 120,
    key: 'requestHeader',
  },
  {
    title: '响应头',
    dataIndex: 'responseHeader',
    valueType: 'text',
    copyable: true,
    ellipsis: true,
    search: false,
    width: 120,
    key: 'responseHeader'
  },
  {
    title: '返回格式',
    dataIndex: 'returnFormat',
    valueType: 'text',
    width: 'lg',
    key: 'returnFormat'
  },
  {
    title: '请求示例',
    dataIndex: 'requestExample',
    valueType: 'text',
    copyable: true,
    ellipsis: true,
    search: false,
    width: 120,
    key: 'requestExample'
  },
  {
    title: '消耗积分数',
    dataIndex: 'reduceScore',
    valueType: 'text',
    width: 80,
    key: 'reduceScore'
  },
  {
    title: '接口图片',
    dataIndex: 'avatarUrl',
    valueType: 'image',
    width: 80,
    key: 'avatarUrl'
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInForm: true,
    filters: true,
    onFilter: true,
    width: 100,
    key: 'status',
    valueEnum: {
      0: {
        text: '关闭',
        status: 'Default',
      },
      1: {
        text: '开启',
        status: 'Processing',
      },
      2: {
        text: '审核中',
        status: 'Warning',
      },
    },
  },
  {
    title: '总调用次数',
    dataIndex: 'totalInvokes',
    valueType: 'text',
    search: false,
    key: 'totalInvokes'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    key: 'createTime',
    search: false,
  },
];

export const InterfaceInfoModalFormColumns: ProFormColumnsType<API.InterfaceInfo>[] = [
  {
    dataIndex: 'id',
    valueType: 'index',
    hideInTable: true,
    key: 'id',
  },
  {
    title: '接口名称',
    dataIndex: 'name',
    tooltip: '接口名称',
    key: 'name',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '接口名称为必填项',
        },
      ],
    },
    width: 'lg',
  },
  {
    title: '接口地址',
    dataIndex: 'url',
    tooltip: '接口地址',
    key: 'url',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '接口地址为必填项',
        },
      ],
    },
    width: 'lg',
  },
  {
    title: '请求方法',
    dataIndex: 'method',
    tooltip: "请求方法",
    valueType: "radio",
    key: "method",
    valueEnum: {
      GET: {
        text: 'GET',
      },
      POST: {
        text: 'POST',
      },
      PUT: {
        text: 'PUT',
      },
      DELETE: {
        text: 'DELETE',
      },
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '请求方法为必填项',
        },
      ],
    },
    width: 'lg',
    colProps: {
      span: 12,
    },
  },
  {
    title: '消耗积分数',
    dataIndex: 'reduceScore',
    tooltip: "消耗积分数",
    width: 'lg',
    key: "reduceScore",
    colProps: {
      span: 12,
    }, formItemProps: {
      rules: [
        () => ({
          validator(_, value) {
            if (!value) {
              return Promise.reject(new Error("消耗积分数为必填项"));
            }
            if (value < 0) {
              return Promise.reject(new Error("消耗积分数不能为负数"));
            }
            return Promise.resolve();
          },
          required: true,
        })],
    },
  },
  {
    title: '请求示例',
    key: "requestExample",
    dataIndex: 'requestExample',
    width: 'lg',
    valueType: "text",
    colProps: {
      span: 12,
    },
  },
  {
    title: '返回格式',
    key: "returnFormat",
    dataIndex: 'returnFormat',
    width: 'lg',
    valueType: "text",
    colProps: {
      span: 12,
    },
  },
  {
    title: '请求参数',
    dataIndex: 'requestParams',
    tooltip: "请求参数",
    key: "requestParams",
    colProps: {
      span: 24,
    },
    renderFormItem: () => <ParamsTable defaultNewColumn={defaultNewRequestColumn} column={requestParam}></ParamsTable>
  },
  {
    title: '响应参数',
    dataIndex: 'responseParams',
    tooltip: "响应参数",
    key: "responseParams",
    colProps: {
      span: 24,
    },
    renderFormItem: () => <ParamsTable column={responseParam} defaultNewColumn={defaultNewResponseColumn}/>,
  },
  {
    title: '接口描述',
    key: "description",
    dataIndex: 'description',
    tooltip: "接口描述",
    width: 'lg',
    valueType: "jsonCode",
    colProps: {
      span: 12,
    },
  },
  {
    title: '请求头',
    dataIndex: 'requestHeader',
    width: 'lg',
    valueType: "jsonCode",
    colProps: {
      span: 12,
    },
    key: 'requestHeader',
  },
]

export default InterfaceInfoColumns;
