import type { ProColumns } from '@ant-design/pro-components';
import {Link} from "@@/exports";
import {Tag} from "antd";
import {InterfaceRequestMethodEnum} from "@/enum/commonEnum";
import React from "react";

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

export default InterfaceInfoColumns;
