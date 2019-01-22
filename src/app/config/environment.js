export default {
  development: {
    isProd: true
  },
  production: {
    isProd: true
  }
}[process.env.NODE_ENV || 'development'];
