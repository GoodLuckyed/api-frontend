import { listProductInfoByPageUsingGet } from '@/services/api-backend/productInfoController';
import ProCard, { CheckCard } from '@ant-design/pro-card';
import {history, useModel} from '@umijs/max';
import {Button, Card, message, Spin, Tooltip} from 'antd';
import React, { useEffect, useState } from 'react';
import ZuanShi from "@/components/icon/ZuanShi";

const Recharge: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { loginUser } = initialState || {};
  const [total,setTotal] = useState<any>('0.00')
  const [productId,setProductId] = useState<any>('')
  const [product, setProduct] = useState<API.ProductInfo[]>();

  const loadData = async () => {
    setLoading(true);
    const res = await listProductInfoByPageUsingGet({});
    if (res.code === 0 && res.data) {
      setProduct(res.data.records || []);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (total === "0.00") {
      setProductId('')
    }
  }, [total])

  return (
    <>
      <Spin spinning={loading}>
        <Card style={{ margin: '0 100px' }}>
          <ProCard
            type={'inner'}
            headerBordered
            bordered
            tooltip={'用于平台接口调用'}
            title={<strong>我的积分余额</strong>}
          >
            <strong>积分：</strong>
            <span style={{ color: 'red', fontSize: 18 }}>{loginUser?.balance}</span>
          </ProCard>
          <br />
          <Card title={<strong>购买积分 💎</strong>}>
            <ProCard wrap>
              <CheckCard.Group
                onChange={(value) => {
                  if (!value){
                    setTotal('0.00')
                    return;
                  }
                  setTotal(value);
                }}
              >
                {product && product.map((item: API.ProductInfo) => (
                    <CheckCard
                      style={{width: 220, height: 330}}
                      key={item.id}
                      title={<strong>💎 {item.addPoints} 积分</strong>}
                      description={item.description}
                      value={item.total}
                      onClick={() => {
                        setTotal(item.total)
                        setProductId(item.id)
                      }}
                      extra={
                        <>
                          <h3
                            style={{
                              color: item.productType === 'COINACTIVITY' ? 'red' : '#A58761',
                              fontSize: 18,
                              fontWeight: 'bold'}}>
                            ￥{item.productType === 'COINACTIVITY' ? '体验 ' : null}
                            {/*// @ts-ignore*/}
                            {item?.total / 100}
                          </h3>
                        </>
                    }
                      // @ts-ignore
                      actions={<><ZuanShi></ZuanShi></>}
                    />
                  ))}
              </CheckCard.Group>
            </ProCard>
            <br/>
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
          <br/>
          <ProCard bordered headerBordered>
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "center", alignContent: "center"}}>
              <div style={{marginRight: "12px", fontWeight: "bold", fontSize: 18}}>实付</div>
              <div style={{marginRight: "20px", fontWeight: "bold", fontSize: 18, color: "red"}}>￥ {total / 100} 元</div>
              <Button type={'primary'} size={'large'} style={{width: 100, padding: 5}}
                      onClick={() => {
                        if (!productId) {
                          message.error('请先选择购买的产品规格！')
                          return
                        }
                        message.loading('正在前往收银台，请稍后.....',0.6)
                        setTimeout(() => {
                          history.push(`/order/pay/${productId}`)
                        },800)
                      }}
              >
                立即购买
              </Button>
            </div>
          </ProCard>
        </Card>
      </Spin>
    </>
  );
};

export default Recharge;
