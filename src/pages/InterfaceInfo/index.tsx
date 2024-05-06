import React, {useEffect, useState} from "react";
import {Badge, Card, Descriptions, message, Spin, Tag} from "antd";
import {useParams} from "@@/exports";
import {getInterfaceInfoUsingGet} from "@/services/api-backend/interfaceInfoController";
import Paragraph from "antd/lib/typography/Paragraph";
import {InterfaceRequestMethodEnum, InterfaceStatusEnum} from "@/enum/commonEnum";
import './index.less'
import {BugOutlined, CodeOutlined, FileExclamationOutlined, FileTextOutlined} from "@ant-design/icons";
import ApiTab from "@/pages/InterfaceInfo/components/ApiTab";
import {returnExample} from "@/pages/InterfaceInfo/components/CodeTemplate";


const InterfaceInfo: React.FC = () => {
  const [loading,setLoading] = useState<boolean>(false)
  const params  = useParams();
  const [data,setData] = useState<API.InterfaceInfo>()
  const [totalInvokes,setTotalInvokes] = useState<number>(0)
  const [requestParams,setRequestParams] = useState([])
  const [responseParams,setResponseParams] = useState([])
  const [activeTabKey, setActiveTabKey] = useState<'api'|'tools'|'errorCode'|'sampleCode'|string>('api')
  const [returnCode, setReturnCode] = useState<any>(returnExample)

  const loadData = async () => {
    if (!params.id){
      message.error('参数不存在')
      return;
    }
    setLoading(true)
    try { //@ts-ignore
      const res = await getInterfaceInfoUsingGet({id: params.id})
      if (res.data && res.code === 0) {
        setData(res.data)
        setTotalInvokes(res.data.totalInvokes || 0)
        let requestParams = res.data.requestParams;
        let responseParams = res.data.responseParams;
        try {
          setRequestParams(requestParams ? JSON.parse(requestParams) : [])
          setResponseParams(responseParams ? JSON.parse(responseParams) : [])
        } catch (e: any) {
          setRequestParams([])
          setResponseParams([])
        }
      }
      setLoading(false)
    } catch (e:any) {
      message.error(e.message)
    }
  }

  useEffect(() => {
    loadData()
  }, []);

  //页签切换的回调
  const responseExampleTabChange = (key:string) => {
    setActiveTabKey(key)
  }

  const responseExampleTabList = [
    {
      key: 'api',
      label: <><FileTextOutlined/> API文档</>,
    },
    {
      key: 'tools',
      label: <><BugOutlined/> 在线调试工具</>,
    },
    {
      key: 'errorCode',
      label: <><FileExclamationOutlined/> 错误码参照</>,
    },
    {
      key: 'sampleCode',
      label: <><CodeOutlined/> 示例代码</>,
    }
  ]

  const responseExampleContentList:Record<string, React.ReactNode> = {
    api:
      <ApiTab
        sampleCodeTab={() => setActiveTabKey('sampleCode')}
        errorCodeTab={() => setActiveTabKey('errorCode')}
        requestParams={requestParams}
        responseParams={responseParams}
        returnCode={returnCode}
      >

      </ApiTab>
  }

  return (
    <Spin spinning={loading}>
      <div style={{margin:'0 100px'}}>
      <Card title={data?.name}>
        <Descriptions>
          <Descriptions.Item key={'url'} label={'接口地址'}><Paragraph copyable>{data?.url}</Paragraph></Descriptions.Item>
          <Descriptions.Item key={'returnFormat'} label={'返回格式'}>{data?.returnFormat}</Descriptions.Item>
          <Descriptions.Item key={'reduceScore'} label={'消耗积分'}>{data?.reduceScore}</Descriptions.Item>
          <Descriptions.Item key={'method'} label={'请求方式'}><Tag color={InterfaceRequestMethodEnum[data?.method ?? 'default']}>{data?.method}</Tag></Descriptions.Item>
          <Descriptions.Item key={'totalInvokes'} label={'总调用次数'}>{totalInvokes}次</Descriptions.Item>
          <Descriptions.Item key={'status'} label={'接口状态'}>
            {data && data.status === 0 ?(  <Badge status="error" text={InterfaceStatusEnum[data.status]} />) : null}
            {data && data.status === 1 ?(  <Badge status="success" text={InterfaceStatusEnum[data.status]} />) : null}
            {data && data.status === 2 ?(  <Badge status="processing" text={InterfaceStatusEnum[data.status]} />) : null}
          </Descriptions.Item>
          <Descriptions.Item key={'description'} label={'接口描述'}>{data?.description ?? '该接口暂无描述信息'}</Descriptions.Item>
          <Descriptions.Item key={'requestExample'} label={'请求示例'}><Paragraph copyable>{data?.requestExample}</Paragraph></Descriptions.Item>
        </Descriptions>
      </Card>
      <Card>
        <p className='highlightLine'>接口详细描述请前往开发者在线文档查看：</p>
        <a href={'https://www.baidu.com'} target={'_blank'} rel={'noreferrer'}>📘接口在线文档：{data?.name}</a>
      </Card>
      <br/>
      <Card
        style={{ width: '100%' }}
        tabList={responseExampleTabList}
        activeTabKey={activeTabKey}
        onTabChange={responseExampleTabChange}
      >
        {responseExampleContentList[activeTabKey]}
      </Card>
      </div>
    </Spin>
  )
}
export default InterfaceInfo;
