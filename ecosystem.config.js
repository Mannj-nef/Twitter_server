export const app = [
  {
    name: 'Twitter Server',
    script: 'node dist/index.js',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }
];
