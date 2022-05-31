const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: true,
  env: {
    BLUE_API_URL: 'http://localhost:8080/api/v1',
    BASE_URL: 'http://localhost:3001',
  },
}
