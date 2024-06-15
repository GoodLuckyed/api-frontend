import CodeHighlighting from '@/components/CodeHighlighting/CodeHighlighting';
import ParamsTable from '@/components/ParamsTable';
import { DEFAULT_ADD_FIELD, requestParam } from '@/pages/InterfaceInfo/components/CodeTemplate';
import { Button, Empty, Form, Select, Space, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import React from 'react';

export type Props = {
  data?: API.InterfaceInfo;
  form: any;
  paramsTableChange: (values: any) => void;
  temporaryParams: any;
  result?: string;
  resultLoading: boolean;
  requestExampleActiveTabKey: string;
  onSearch: (values: any) => void;
};

const ToolsTab: React.FC<Props> = (props) => {
  const {
    data,
    form,
    paramsTableChange,
    temporaryParams,
    resultLoading,
    result,
    requestExampleActiveTabKey,
    onSearch,
  } = props;

  const selectAfter = (
    <Select
      defaultValue={data?.method}
      style={{ width: 120 }}
      disabled
      options={[
        { value: 'GET', label: 'GET', disabled: true },
        { value: 'POST', label: 'POST', disabled: true },
        { value: 'PUT', label: 'PUT', disabled: true },
        { value: 'DELETE', label: 'DELETE', disabled: true },
      ]}
    />
  );

  return (
    <>
      <Form
        form={form}
        scrollToFirstError
        onFinish={(values) => onSearch?.(values)}
        onReset={() => {
          form.resetFields(['requestParams']);
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', justifyItems: 'center' }}>
          <Search
            addonBefore={selectAfter}
            readOnly
            value={data?.url}
            enterButton={'发起请求'}
            onSearch={form.submit}
            size={'large'}
            style={{ maxWidth: 600 }}
          />
        </div>
        <p className={'highlightLine'} style={{ marginTop: 25 }}>
          请求参数设置：
        </p>
        <Form.Item name={'requestParams'}>
          <ParamsTable
            defaultNewColumn={DEFAULT_ADD_FIELD}
            onChange={(value: any) => {
              paramsTableChange?.(value);
            }}
            column={requestParam}
            value={temporaryParams}
          ></ParamsTable>
        </Form.Item>
        <Form.Item>
          <Space size={'large'} wrap>
            <Button type="primary" htmlType={'reset'} style={{ width: 180 }}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <p className={'highlightLine'} style={{ marginTop: 25 }}>
        返回结果：
      </p>
      <Spin spinning={resultLoading}>
        {result ? (
          <CodeHighlighting
            codeString={result}
            language={requestExampleActiveTabKey}
          ></CodeHighlighting>
        ) : (
          <Empty description={'未发起调用，暂无请求信息'} />
        )}
      </Spin>
    </>
  );
};

export default ToolsTab;
