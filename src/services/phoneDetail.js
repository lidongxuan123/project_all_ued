import request from '@/utils/request';

export function queryIntegralGoodsDetail2C (params) {
  return request('/api/goods/queryGoodsDetail2C', { method: 'GET', params });
}