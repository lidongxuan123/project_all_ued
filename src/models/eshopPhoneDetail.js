import {
  queryIntegralGoodsDetail2C
} from '@/services/phoneDetail';

export default {
  namespace: 'phoneDetail',
  state: {
    queryGoodsDetail: {}
  },
  effects: {
    *queryIntegralGoodsDetail2C({ payload }, { call, put }) {
      const data = yield call(queryIntegralGoodsDetail2C, payload);
      const resData = data && data.resultData || {};
      const info = data && data.resultMsg || '';
      const code = data && data.resultCode || '';
      yield put({
        type: 'save',
        payload: { queryGoodsDetail: resData, returnInfo: info, returnCode: code },
      })
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {};
    },
  },
};
