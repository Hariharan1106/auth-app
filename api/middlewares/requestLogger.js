import crypto from 'crypto';

/**
 * Creates a request logger middleware
 * @param {Object} options - Configuration options
 * @returns {Function} Express middleware
 */
export const createRequestLogger = (options = {}) => {
  return (req, res, next) => {
    const requestId = req.headers['x-request-id'] || crypto.randomUUID();
    req.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);

    const startTime = Date.now();
    const { method, url, ip, headers } = req;
    const clientIp = headers['x-forwarded-for'] || ip;
    const userAgent = headers['user-agent'] || 'unknown';

    console.info('request.start', {
      requestId,
      method,
      url,
      clientIp,
      userAgent: userAgent.substring(0, 100)
    });

    res.on('finish', () => {
      const duration = Date.now() - startTime;

      if (res.statusCode >= 500) {
        console.error('request.finish', { requestId, statusCode: res.statusCode, durationMs: duration });
      } else {
        console.info('request.finish', { requestId, statusCode: res.statusCode, durationMs: duration });
      }
    });

    next();
  };
};

export default createRequestLogger;
