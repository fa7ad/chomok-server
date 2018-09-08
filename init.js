const path = require('path')

module.exports = function () {
  return {
    port: process.env.PORT || 3333,
    db_prefix: process.env.DB_PREFIX || 'ch_',
    cwd: path.resolve(process.env.CWD || __dirname),
    prod: process.env.NODE_ENV === 'production'
  }
}
