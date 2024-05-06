import React from "react";
import {Table} from "antd";
import {Column} from "rc-table";
import {requestParameters, responseParameters} from "@/pages/InterfaceInfo/components/CodeTemplate";
import CodeHighlighting from "@/components/CodeHighlighting/CodeHighlighting";


export type Props = {
  requestParams?: [];
  responseParams?: [];
  errorCodeTab: () => void;
  sampleCodeTab: () => void;
  returnCode: string
};

const ApiTab: React.FC<Props> = (props) => {
  const {requestParams, errorCodeTab, sampleCodeTab, responseParams, returnCode} = props;
  return(
    <>
      <p className={'highlightLine'} style={{marginTop: 15}}>请求参数说明：</p>
      <Table dataSource={requestParams && requestParams.length > 0 ? requestParams : requestParameters}
             pagination={false}
             size={'small'}
             style={{maxWidth: 800}}
      >
        <Column title="参数名称" dataIndex="fieldName" key="fieldName"/>
        <Column title="是否必选" dataIndex="required" key="required"/>
        <Column title="参数类型" dataIndex="type" key="type"/>
        <Column title="参数描述" dataIndex="desc" key="desc"/>
      </Table>
      <p className={'highlightLine'} style={{marginTop: 15}}>响应参数说明：<a onClick={() => errorCodeTab?.()}>错误码参照</a></p>
      <Table dataSource={responseParams && responseParams.length > 0 ? responseParams : responseParameters}
             pagination={false}
             size={'small'}
             style={{maxWidth: 800}}
      >
        <Column title="参数名称" dataIndex="fieldName" key="fieldName"/>
        <Column title="参数类型" dataIndex="type" key="type"/>
        <Column title="参数描述" dataIndex="desc" key="desc"/>
      </Table>
      <a onClick={() => sampleCodeTab?.()}>见示例代码</a>
      <p className={'highlightLine'} style={{marginTop:15}}>返回示例：</p>
      <CodeHighlighting codeString={returnCode} language={'javascript'}></CodeHighlighting>
    </>
  )
}

export default ApiTab;
