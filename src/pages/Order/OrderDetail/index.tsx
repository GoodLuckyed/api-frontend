import React, {useEffect, useState} from "react";
import {Badge, Card, Descriptions, message, Spin, Tag, Tooltip} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import {InterfaceRequestMethodEnum, InterfaceStatusEnum, orderPayTypeEnum} from "@/enum/commonEnum";
import {useParams} from "@@/exports";
import {getOrderInfoUsingGet} from "@/services/api-backend/orderController";
import ProCard from "@ant-design/pro-card";


const OrderDetail: React.FC = () => {
  const [loading,setLoading] = useState<boolean>(false)
  const params = useParams();
  const [data,setData] = useState<API.OrderInfo>()

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  const loadData = async () => {
    if (!params.id){
      message.error('参数不存在')
      return;
    }
    setLoading(true)
    const res = await getOrderInfoUsingGet({id: params.id})
    if (res.code === 0 && res.data){
      setData(res.data)
      setLoading(false)
    }else {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Spin spinning={loading}>
      <div style={{margin: '0 100px'}}>
        <Card title={'订单详情'}>
          <Descriptions>
            <Descriptions.Item key={'title'} label={'订单名称'}>
              <Paragraph copyable>{data?.title}</Paragraph>
            </Descriptions.Item>
            <Descriptions.Item key={'total'} label={'订单金额（单位：分）'}>
              {data?.total}
            </Descriptions.Item>
            <Descriptions.Item key={'addPoints'} label={'增加积分数'}>
              {data?.addPoints}
            </Descriptions.Item>
            <Descriptions.Item key={'paymentType'} label={'支付类型'}>
              <Tag color={orderPayTypeEnum[data?.paymentType ?? 'default']}>
                {data?.paymentType}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item key={'status'} label={'订单状态'}>
              {data && data.status === '支付成功' ? (
                <Badge status="success" text={'支付成功'}/>
              ) : null}
              {data && data.status === '未支付' ? (
                <Badge status="error" text={'未支付'}/>
              ) : null}
              {data && data.status === '用户已取消' ? (
                <Badge status="default" text={'用户已取消'}/>
              ) : null}
            </Descriptions.Item>
            <Descriptions.Item key={'orderNo'} label={'订单号'}>
              {data?.orderNo}
            </Descriptions.Item>
            <Descriptions.Item key={'expirationTime'} label={'过期时间'}>
              {formatDate(data?.expirationTime)}
            </Descriptions.Item>
            <Descriptions.Item key={'createTime'} label={'创建时间'}>
              {formatDate(data?.createTime)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <br/>
        <br/>
        <br/>
        <ProCard style={{marginTop: -20, fontSize: 16}} layout={'center'}>
              <span>本商品为虚拟内容，购买后不支持退换、转让。点击【立即购买】表示您已阅读并接受
                <a href={'https://www.baidu.com'} target={'_blank'} rel={'noreferrer'}>用户协议</a>
              ，若付款成功后10分钟内未到账，请联系：
                  <Tooltip placement="bottom" title={'2826038059@qq.com'}>
                  <a>邮箱</a>
                  </Tooltip>
              </span>
        </ProCard>
      </div>
    </Spin>
  );
}

export default OrderDetail;
