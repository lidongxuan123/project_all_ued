import pageRoutes from './router.config';
import customProxy from './proxy.config';
import themeConfig from './theme.config';
import path from 'path';
import defaultSettings from '../src/defaultSettings';

const { basePath, appletName } = defaultSettings;
export default {
  base: `${basePath}/${appletName}/`,
  publicPath: `${basePath}/${appletName}/`,
  treeShaking: true,
  //路由配置：路径相对于src/pages
  routes: pageRoutes,
  //主题配置
  theme: themeConfig,
  proxy: customProxy,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: { webpackChunkName: true },
      title: 'eshopmobile',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  alias:{
    components:path.resolve(__dirname,'src/components'),
    utils:path.resolve(__dirname,'src/utils'),
    services:path.resolve(__dirname,'src/services'),
    models:path.resolve(__dirname,'src/models'),
    // themes:path.resolve(__dirname,'src/themes'),
    images:path.resolve(__dirname,'src/assets')
  },
}
