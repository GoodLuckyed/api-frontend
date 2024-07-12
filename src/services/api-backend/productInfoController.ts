// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 添加产品 POST /api/productInfo/add */
export async function addProductInfoUsingPost(
  body: API.ProductInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/productInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除产品 POST /api/productInfo/delete */
export async function delProductInfoUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/productInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据id获取产品信息 GET /api/productInfo/get */
export async function getProductInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProductInfo>('/api/productInfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取产品列表 GET /api/productInfo/list */
export async function listInterfaceInfoUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfoUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListProductInfo>('/api/productInfo/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页获取产品列表 GET /api/productInfo/list/page */
export async function listProductInfoByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listProductInfoByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProductInfo>('/api/productInfo/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 下线产品 POST /api/productInfo/offline */
export async function offlineProductInfoUsingPost(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/productInfo/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发布产品 POST /api/productInfo/online */
export async function onlineProductInfoUsingPost(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/productInfo/online', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改产品 POST /api/productInfo/update */
export async function updateProductInfoUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateProductInfoUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/productInfo/update', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
