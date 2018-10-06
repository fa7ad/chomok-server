const path = require('path')

module.exports = {
  apps: [
    {
      name: 'Chomok-server',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
        DB_PREFIX: 'chomok_',
        CWD: path.resolve(__dirname)
      },
      node_args: ['-r', 'esm'],
      exec_mode: 'fork'
    }
  ],
  watch: true,
  ignore_watch: ['node_modules']
}
