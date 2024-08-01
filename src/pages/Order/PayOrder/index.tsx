import React, {useEffect, useState} from "react";
import {Card, message, Radio, Spin, Tooltip} from "antd";
import ProCard from "@ant-design/pro-card";
import WxPay from "@/components/icon/WxPay";
import Alipay from "@/components/icon/Alipay";
import {useParams} from "@@/exports";
import {getProductInfoUsingGet} from "@/services/api-backend/productInfoController";
import {tradePayUsingPost} from "@/services/api-backend/aliPayController";

export const valueLength = (val:any) => {
  return val && val.trim().length > 0
}
const PayOrder: React.FC = () => {

  const [loading,setLoading] = useState<boolean>(false);
  const [product,setProduct] = useState<API.ProductInfo>()
  const [payType,setPayType] = useState<string>('WX')
  const params = useParams();

  // 获取购买的商品信息
  const getProductInfo = async () => {
    setLoading(true)
    if (!params.id){
      return;
    }
    const res = await getProductInfoUsingGet({id: params.id})
    if (res.code === 0 && res.data){
      setProduct(res.data)
    }
    setLoading(false)
  }

  // 跳转到支付宝支付
  const toAlipay = async () => {
    if (!params.id){
      message.error("参数不存在")
      return;
    }
    setLoading(true)
    const res = await tradePayUsingPost(
      {productId: params.id, paymentType: payType}
    )
    if (res.code === 0 && res.data){
      message.loading('正在前往收银台,请稍后....')
      setTimeout(() => {
        document.write(res.data as string)
      },2000)
    }else {
      setLoading(false)
      message.error(res.message)
    }
  }

  useEffect(() => {
    getProductInfo()
  }, []);

  useEffect(() => {
    if (payType === 'ALIPAY') {
      toAlipay()
    }
  }, [payType]);

  const changePayType = (value:string) => {
    setPayType(value)
  }

  return (
    <>
      <Card style={{minWidth: 385}}>
        <Spin spinning={loading}>
          <Card title={<strong>商品信息</strong>}>
            <div style={{marginLeft: 10}}>
              <h3>商品名称：{product?.name}</h3>
              <h4>商品描述：{valueLength(product?.description) ? product?.description : "暂无商品描述信息"}</h4>
            </div>
          </Card>
          <br/>
          <ProCard
            bordered
            headerBordered
            layout={"center"}
            title={<strong>支付方式</strong>}
          >
            <Radio.Group name="payType" value={payType}>
              <ProCard wrap gutter={18}>
                <ProCard
                  onClick={() => {
                    changePayType("WX")
                  }}
                  hoverable
                  style={{
                    border: payType === "WX" ? '1px solid #1890ff' : '1px solid rgba(128, 128, 128, 0.5)',
                    maxWidth: 260,
                    minWidth: 210,
                    margin: 10,
                  }}
                  colSpan={
                    {
                      xs: 24,
                      sm: 12,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }
                  }>
                  <Radio value={"WX"} style={{fontSize: "1.12rem"}} disabled>
                    <WxPay/> 微信支付
                  </Radio>
                </ProCard>
                <ProCard
                  onClick={() => {
                    changePayType("ALIPAY")
                  }}
                  hoverable
                  style={{
                    margin: 10,
                    maxWidth: 260,
                    minWidth: 210,
                    border: payType === "ALIPAY" ? '1px solid #1890ff' : '1px solid rgba(128, 128, 128, 0.5)',
                  }}
                  colSpan={
                    {
                      xs: 24,
                      sm: 12,
                      md: 12,
                      lg: 12,
                      xl: 12
                    }
                  }
                >
                  <Radio value={"ALIPAY"} style={{fontSize: "1.2rem"}}>
                    <Alipay/> 支付宝
                  </Radio>
                </ProCard>
              </ProCard>
            </Radio.Group>
          </ProCard>
          <br/>
          <Card title={"支付二维码"}>
            <br/>
            {/*<ProCard*/}
            {/*  style={{marginTop: -30}}*/}
            {/*  layout={"center"}>*/}
            {/*  <QRCode*/}
            {/*    errorLevel="H"*/}
            {/*    size={240}*/}
            {/*    value={qrCode}*/}
            {/*    // @ts-ignore*/}
            {/*    status={status}*/}
            {/*    onRefresh={() => {*/}
            {/*      if (!payType) {*/}
            {/*        message.error("请先选择支付方式")*/}
            {/*        return*/}
            {/*      }*/}
            {/*      createOrder()*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</ProCard>*/}
            {/*<ProCard style={{*/}
            {/*  marginTop: -30,*/}
            {/*  color: "#f55f4e",*/}
            {/*  fontSize: 22,*/}
            {/*  display: 'flex',*/}
            {/*  fontWeight: "bold",*/}
            {/*}} layout={"center"}>*/}
            {/*  ￥{total}*/}
            {/*</ProCard>*/}
            <ProCard style={{marginTop: -20,fontSize:16}} layout={'center'}>
              <span>本商品为虚拟内容，购买后不支持退换、转让。点击【立即购买】表示您已阅读并接受
                <a href={'https://www.baidu.com'} target={'_blank'} rel={'noreferrer'}>用户协议</a>
              ，若付款成功后10分钟内未到账，请联系：
                  <Tooltip placement="bottom" title={'2826038059@qq.com'}>
                  <a>邮箱</a>
                  </Tooltip>
              </span>
            </ProCard>
          </Card>
        </Spin>
      </Card>
    </>
  )
}


export default PayOrder;
