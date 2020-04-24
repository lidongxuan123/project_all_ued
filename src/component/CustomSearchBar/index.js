// 搜索栏可自定义：
// onLeftClick: 左边的组件点击方法
// title：标题
// rightContent： 右边的组件（比如edit链接）
// children: 导航底部内容
import React from 'react';
import styles from './index.less';
import {SearchBar, WingBlank} from 'antd-mobile';
import { formatMessage } from 'umi-plugin-react/locale';

class CustomSearchBar extends React.Component {
  render() {
    return (
      <div className={styles.customSearchBar}>
        <div className={styles.searchBarLeft}>
          <span>
            <div className={styles.navSearchIcon} />
          </span>
        </div>
        <SearchBar
          // value={this.props.value || 'Search'}
          // placeholder="Search"
          placeholder={formatMessage({ id:'search.bar.placeholder' })}
          // onSubmit={value => console.log(value, 'onSubmit')}
          // onClear={value => console.log(value, 'onClear')}
          // onFocus={() => console.log('onFocus')}
          // onBlur={() => console.log('onBlur')}
          // onCancel={() => console.log('onCancel')}
          showCancelButton
          cancelText={formatMessage({ id:'common.cancel' })}
          // onChange={this.onChange}
        />
        <WingBlank size="lg">{this.props.children}</WingBlank>
      </div>
    );
  }
}

export default CustomSearchBar;
