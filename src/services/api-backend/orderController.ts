// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除订单 POST /api/order/delete */
export async function deleteOrderUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/order/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取订单信息 GET /api/order/get */
export async function getOrderInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getOrderInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseOrderInfo>('/api/order/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取订单列表 POST /api/order/list/page */
export async function listOrderByPageUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listOrderByPageUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageOrderInfo>('/api/order/list/page', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户取消订单 POST /api/order/trade/close/${param0} */
export async function cancelOrderUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cancelOrderUsingPOSTParams,
  options?: { [key: string]: any },
) {
  const { orderNo: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/order/trade/close/${param0}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}
