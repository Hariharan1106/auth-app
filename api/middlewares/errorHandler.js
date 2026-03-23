import mongoose from 'mongoose';
import { isProduction } from '../config.js';

/**
 * Determines if the error is a operational error (expected)
 * @param {Error} error
 * @returns {boolean}
 */
const isOperationalError = (error) => {
  if (error instanceof mongoose.Error) {
    return true;
  }
  return error.isOperational || false;
};

/**
 * Sanitize error message to prevent leaking sensitive information
 * @param {Error} error
 * @returns {string}
 */
const sanitizeErrorMessage = (error) => {
  if (isProduction) {
    if (error.isOperational) {
      return error.message;
    }
    return 'Internal server error';
  }
  return error.message;
};

/**
 * Gets a human-readable error type
 * @param {Error} error
 * @returns {string}
 */
const getErrorType = (error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return 'ValidationError';
  }
  if (error instanceof mongoose.Error.CastError) {
    return 'CastError';
  }
  if (error.name === 'JsonWebTokenError') {
    return 'JsonWebTokenError';
  }
  if (error.name === 'TokenExpiredError') {
    return 'TokenExpiredError';
  }
  if (error.code === 11000) {
    return 'DuplicateKeyError';
  }
  if (error.name === 'MongoServerError') {
    return 'MongoServerError';
  }
  return error.name || 'Error';
};

/**
 * Creates the centralized error handler middleware
 * @param {Object} options - Configuration options
 * @returns {Function} Express error handler middleware
 */
export const createErrorHandler = (options = {}) => {
  return (err, req, res, next) => {
    if (res.headersSent) {
      return next(err);
    }

    const requestId = req.requestId || 'unknown';
    const errorType = getErrorType(err);

    const logPayload = {
      requestId,
      errorType,
      message: err.message,
      stack: !isProduction ? err.stack : undefined,
      path: req.path,
      method: req.method,
      statusCode: err.statusCode || 500
    };

    if ((err.statusCode || 500) >= 500) {
      console.error('request.error', logPayload);
    } else {
      console.warn('request.error', logPayload);
    }

    if (err instanceof mongoose.Error.ValidationError) {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({
        success: false,
        requestId,
        statusCode: 400,
        error: 'ValidationError',
        message: messages.join(', ')
      });
    }

    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({
        success: false,
        requestId,
        statusCode: 400,
        error: 'CastError',
        message: `Invalid ${err.path}: ${err.value}`
      });
    }

    if (err.code === 11000) {
      const field = Object.keys(err.keyValue || {})[0];
      return res.status(409).json({
        success: false,
        requestId,
        statusCode: 409,
        error: 'DuplicateKeyError',
        message: `Duplicate field value: ${field}. Please use a different value.`
      });
    }

    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        requestId,
        statusCode: 401,
        error: 'JsonWebTokenError',
        message: 'Invalid authentication token'
      });
    }

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        requestId,
        statusCode: 401,
        error: 'TokenExpiredError',
        message: 'Authentication token has expired'
      });
    }

    if (err.name === 'MulterError') {
      return res.status(400).json({
        success: false,
        requestId,
        statusCode: 400,
        error: 'MulterError',
        message: err.message
      });
    }

    const statusCode = err.statusCode || 500;
    const message = sanitizeErrorMessage(err);

    res.status(statusCode).json({
      success: false,
      requestId,
      statusCode,
      error: errorType,
      message,
      ...(!isProduction && { stack: err.stack })
    });
  };
};

/**
 * Middleware to catch 404 - Not Found routes
 * @returns {Function} Express middleware
 */
export const createNotFoundHandler = () => {
  return (req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    error.isOperational = true;
    next(error);
  };
};

export default createErrorHandler;
