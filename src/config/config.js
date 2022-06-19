export default {
  WEBSITE_NAME: import.meta.env.VUE_APP_WEBSITE_NAME || 'Lumen IM',
  BASE_API_URL: import.meta.env.VUE_APP_API_BASE_URL || '',
  BASE_WS_URL: import.meta.env.VUE_APP_WEB_SOCKET_URL || ''
};
