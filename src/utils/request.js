/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import router from 'umi/router';
import { getBasePath, getLocalStorageWithPath, setLocalStorageWithPath } from './utils';
import { eshopRequestPrefix, loginPath } from '@/defaultSettings';
import { showBlock, hideBlock } from './loading';

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

/**
 * 异常处理程序
 */
const errorHandler = async error => {
  const { response = {} } = error;
  // const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  const errorInfo = await response.json();
  if (errorInfo.code && errorInfo.code.indexOf('PORTAL-SECURITY') >= 0) {
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorInfo.message,
    });
    router.push(`/${loginPath}`);
    return;
  }

  if (status === 401) {
    notification.error({
      message: '未登录或登录已过期，请重新登录。',
    });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  // notification.error({
  //   message: `请求错误 ${status}: ${url}`,
  //   description: errortext,
  // });

  // 外部系统鉴权
  if (url.indexOf('integration/auth') > -1 && (status <= 504 && status >= 500)) {
    const errorMessage = errorInfo.error ? errorInfo.error : errorInfo;
    if (errorMessage.code) {
      message.warn(errorMessage.message);
    } else {
      message.error(errorMessage.message);
    }
    router.push('/alnilamHome/403');
    return;
  }
  if (url.indexOf('/activation') > -1 && (status <= 504 && status >= 500)) {
    const errorMessage = errorInfo.error ? errorInfo.error : errorInfo;
    if (errorMessage.code) {
      message.warn(errorMessage.message);
    } else {
      message.error(errorMessage.message);
    }
    router.push('/exception/404');
    return;
  }
  if (status === 500) {
    const errorMessage = errorInfo.error ? errorInfo.error : errorInfo;
    if (errorMessage.code) {
      message.warn(errorMessage.description?errorMessage.description:errorMessage.message);
    } else {
      message.error(errorMessage.message);
    }
    throw error;
  }

  // environment should not be used
  if (status === 403) {
    // router.push('/exception/403');
    return;
  }
  // if (status <= 504 && status >= 500) {
  //   router.push('/exception/500');
  //   return;
  // }
  if (status >= 404 && status < 422) {
    // router.push('/exception/404');
  }
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  prefix: eshopRequestPrefix,
});

request.interceptors.request.use((url, options) => {
  const authToken = options.headers['token'] || getLocalStorageWithPath('Auth-Token');
  const headers = Object.assign({}, options.headers);
  if (options.method === 'POST') {
    showBlock();
  }
  return {
    url,
    options: {
      ...options,
      headers: {
        ...headers,
        'token': authToken,
        'deviceType': '2',
      },
    },
  };
});

request.interceptors.response.use(response => {
  const basePath = getBasePath();
  const authToken = response.headers.get('token');
  hideBlock();
  if (authToken) {
    setLocalStorageWithPath('Auth-Token', authToken, basePath);
  }
  return response;
});

export default request;
