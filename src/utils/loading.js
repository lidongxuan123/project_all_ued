/* eslint-disable no-underscore-dangle */
export function showBlock() {
  window.g_app._store.dispatch({ type: 'global/updateLoadingState', payload: true });
}

export function hideBlock() {
  window.g_app._store.dispatch({ type: 'global/updateLoadingState', payload: false });
}
