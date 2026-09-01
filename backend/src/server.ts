import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();

const server = app.listen(env.PORT, () => {
  console.log(`🚀 ExploreBD API server running on port ${env.PORT} [${env.NODE_ENV}]`);
  console.log(`🗺️ Healthcheck available at http://localhost:${env.PORT}/health`);
});

// Graceful shutdown handling
const handleShutdown = (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down ExploreBD API server gracefully...`);
  server.close(() => {
    console.log('ExploreBD API server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
