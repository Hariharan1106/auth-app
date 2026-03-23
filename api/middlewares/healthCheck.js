import mongoose from 'mongoose';
import config from '../config.js';

const checkSystem = () => {
  const memUsage = process.memoryUsage();
  const memUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
  const memTotalMB = Math.round(memUsage.heapTotal / 1024 / 1024);

  return {
    memory: {
      used: `${memUsedMB} MB`,
      total: `${memTotalMB} MB`,
      usage: `${Math.round((memUsedMB / memTotalMB) * 100)}%`
    },
    uptime: `${process.uptime().toFixed(0)}s`,
    nodeVersion: process.version,
    platform: process.platform
  };
};

export const createHealthCheck = () => {
  return async (req, res) => {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: config.appName,
      version: config.appVersion
    };

    res.status(200).json({
      success: true,
      ...health,
      checks: {
        system: checkSystem()
      }
    });
  };
};

export const createLivenessProbe = () => {
  return (req, res) => {
    res.status(200).json({
      success: true,
      status: 'alive',
      timestamp: new Date().toISOString(),
      uptime: `${process.uptime().toFixed(0)}s`
    });
  };
};

export const createReadinessProbe = () => {
  return async (req, res) => {
    const mongoHealthy = mongoose.connection.readyState === 1;

    const statusCode = mongoHealthy ? 200 : 503;
    res.status(statusCode).json({
      status: mongoHealthy ? 'ready' : 'not_ready',
      timestamp: new Date().toISOString(),
      checks: {
        database: mongoHealthy ? 'connected' : 'disconnected'
      }
    });
  };
};

export default {
  createHealthCheck,
  createLivenessProbe,
  createReadinessProbe
};
