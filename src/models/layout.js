export default {
  namespace: 'layout',
  state: {
    title: '含包阁',  //默认标题
  },
  subscriptions: {},
  effects: {},
  reducers: {
    updatetitle(state, action) {
      return {...state, ...action.payload};
    }
  }
};

