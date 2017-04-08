module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'nodejs-boilerplate-server',
      script: 'server.js',
      watch: true,
      ignore_watch: ['node_modules', 'uploads', 'docs', '.idea', '.git'],
    },

    // Second application
    {
      name: 'nodejs-boilerplate-docs',
      script: 'docs.js',
      watch: ['docs/css', 'docs/js', 'docs/pages', 'docs/index.html'],
      ignore_watch: ['node_modules', 'uploads', '.idea', '.git'],
    }
  ]
}
