// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 支付通知 POST /api/aliPay/trade/notify */
export async function tradeNotifyUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.tradeNotifyUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/aliPay/trade/notify', {
    method: 'POST',
    params: {
      ...params,
      params: undefined,
      ...params['params'],
    },
    ...(options || {}),
  });
}

/** 手机网站支付接口 POST /api/aliPay/trade/pay */
export async function tradePayUsingPost(
  body: API.PayCreateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsestring>('/api/aliPay/trade/pay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
