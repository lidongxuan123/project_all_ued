/* eslint-disable no-bitwise, no-param-reassign */
import { appletName } from '@/defaultSettings';

/**
 * 按路径存储不同App的Auth-Token
 * 目前分为portal、ecare、pto
 */
export function getBasePath() {
  return `/${appletName}`;
}

export function setLocalStorageWithPath(key, value, path) {
  const itemKey = getItemPath(key, path);
  window.localStorage.setItem(itemKey, value);
}

export function getLocalStorageWithPath(key, path) {
  const itemKey = getItemPath(key, path);
  return window.localStorage.getItem(itemKey);
}

export function removeLocalStorageWithPath(key, path) {
  const itemKey = getItemPath(key, path);
  return window.localStorage.removeItem(itemKey);
}

// 存储需要按路径区分的localStorage，如Auth-Token、userInfo
function getItemPath(key, path) {
  const basePath = path || getBasePath();
  return `${basePath}:${key}`;
}

