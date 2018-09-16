module.exports = {
  apps: [
    {
      name: 'Chomok-server',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
        DB_PREFIX: 'chomok_',
        CWD: '/home/node-www/chomok-server'
      },
      node_args: ['-r', 'esm'],
      exec_mode: 'fork'
    }
  ]
}
