module.exports = {
  apps: [
    {
      name: 'Chomok-server',
      script: 'server.js',
      env: {
        NODE_ENV: 'development',
        PORT: 3333,
        DB_PREFIX: 'chomok_'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3003,
        DB_PREFIX: 'chomok_',
        CWD: '/home/node-www/chomox-server'
      },
      node_args: ['-r', 'esm']
    }
  ]
}
