import mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import app from './app.js';
import config from './config.js';

let server;
let isShuttingDown = false;

const closeServer = async () => {
  if (!server) {
    return;
  }

  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
};

const gracefulShutdown = async (signal) => {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;
  console.warn('server.shutdown.start', { signal });

  try {
    await closeServer();
    await mongoose.connection.close();
    console.info('server.shutdown.complete', { signal });
    process.exit(0);
  } catch (error) {
    console.error('server.shutdown.error', {
      signal,
      error: error.message
    });
    process.exit(1);
  }
};

const startServer = async () => {
  const maxRetries = 3;
  let retryCount = 0;
  let lastError = null;

  while (retryCount < maxRetries) {
    try {
      const mongoOptions = {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      };
      
      await mongoose.connect(config.databaseUrl, mongoOptions);
      console.info('mongo.connected', {});

      server = app.listen(config.port, () => {
        console.info('server.started', { port: config.port });
      });
      return;
    } catch (error) {
      lastError = error;
      retryCount++;
      console.warn('server.startup.retry', { 
        attempt: retryCount, 
        maxRetries,
        error: error.message 
      });
      
      if (retryCount < maxRetries) {
        await setTimeout(3000);
      }
    }
  }
  
  console.error('server.startup.error', { 
    error: lastError?.message,
    code: lastError?.code,
    hint: 'Check MongoDB Atlas: cluster status, network access (IP whitelist), and credentials'
  });
  process.exit(1);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('unhandledRejection', (reason) => {
  console.error('process.unhandled_rejection', {
    reason: reason instanceof Error ? reason.message : String(reason)
  });
});
process.on('uncaughtException', (error) => {
  console.error('process.uncaught_exception', { error: error.message });
  process.exit(1);
});

await startServer();
