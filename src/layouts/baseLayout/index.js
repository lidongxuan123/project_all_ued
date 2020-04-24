import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import { Icon, NavBar } from 'antd-mobile';
import {connect} from 'dva';

class BaseLayout extends React.Component {
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon key="1" type="ellipsis" />}
          onLeftClick={() => console.log('onLeftClick')}
        >{this.props.title}</NavBar>
        {this.props.children}
      </div>
    );
  }
}

//绑定layout model ，获取title
function mapStateToProps(state) {
  const { title } = state.layout;
  return {
    title
  };
}

export default connect(mapStateToProps)(BaseLayout);
