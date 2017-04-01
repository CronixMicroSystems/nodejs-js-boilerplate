module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'crm-cronix-server',
      script: 'server.js',
      watch: true,
      ignore_watch: ['node_modules', 'uploads', 'docs', '.idea', '.git'],
    },

    // Second application
    {
      name: 'crm-cronix-docs',
      script: 'docs.js',
      watch: ['docs/css', 'docs/js', 'docs/pages', 'docs/index.html'],
      ignore_watch: ['node_modules', 'uploads', '.idea', '.git'],
    }
  ]
}
