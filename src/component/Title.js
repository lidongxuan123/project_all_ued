import React from 'react';
import {connect} from 'dva';

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispatch: props.dispatch,
      defaultTitle: props.title
    };

    //加载该组件时更新标题
    props.dispatch({
      type: 'layout/updatetitle',
      payload: {'title': props.children},
    });
  }

  //卸载该组件时设置默认标题
  componentWillUnmount() {
    this.state.dispatch({
      type: 'layout/updatetitle',
      payload: {'title': this.state.defaultTitle},
    });
  }

  render() {
    return (<></>);  //空空如也
  }
}

//绑定layout model ，获取title
function mapStateToProps(state) {
  const { title } = state.layout;
  return {
    title
  };
}
export default connect(mapStateToProps)(Title);
