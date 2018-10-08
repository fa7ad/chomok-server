const dotenv = require('dotenv')
const { parsed: env } = dotenv.config()

module.exports = {
  apps: [
    {
      name: 'Chomok-server',
      script: 'server.dist.js',
      env,
      exec_mode: 'fork'
    }
  ]
}
