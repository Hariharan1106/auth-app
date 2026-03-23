import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
export const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password';
export const ACCOUNT_LOCKED_MESSAGE = 'Account temporarily locked due to too many failed login attempts';

const REFRESH_COOKIE_NAME = 'refresh_token';
const SALT_ROUNDS = 10;

export const hashPassword = (password) => bcrypt.hashSync(password, SALT_ROUNDS);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
export const hashRefreshToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

export const getActiveLockoutUntil = (user) => {
  if (user.security?.lockoutUntil && new Date(user.security.lockoutUntil) > new Date()) {
    return new Date(user.security.lockoutUntil);
  }
  return null;
};

export const getRefreshTtlMs = () => 7 * 24 * 60 * 60 * 1000;

export const getUserAgent = (req) => req.headers['user-agent'] || 'unknown';

export const buildCookieOptions = () => ({
  httpOnly: true,
  secure: config.env === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 1000
});

export const buildCsrfCookieOptions = () => ({
  httpOnly: false,
  secure: config.env === 'production',
  sameSite: 'strict',
  maxAge: 60 * 60 * 1000
});

export const buildRefreshCookieOptions = () => ({
  httpOnly: true,
  secure: config.env === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000
});

export const REFRESH_COOKIE_NAME_EXPORT = REFRESH_COOKIE_NAME;

export const issueRefreshTokenValue = () => crypto.randomBytes(64).toString('hex');

export const signAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: '1h' }
  );
};

export const issueCsrfToken = () => crypto.randomBytes(32).toString('hex');

export const issueSession = async ({ req, res, user }) => {
  const accessToken = signAccessToken(user);
  const csrfToken = issueCsrfToken();
  const refreshToken = issueRefreshTokenValue();

  res.cookie('access_token', accessToken, buildCookieOptions());
  res.cookie('csrf_token', csrfToken, buildCsrfCookieOptions());
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, buildRefreshCookieOptions());

  return { accessToken, csrfToken, refreshToken };
};

export const resetSigninSecurityState = async (user) => {
  user.security = user.security || {};
  user.security.failedLoginAttempts = 0;
  user.security.lockoutUntil = null;
  user.security.lockoutCount = 0;
  user.security.lastFailedLoginAt = null;
};

export const recordFailedSigninAttempt = async (user) => {
  user.security = user.security || {};
  user.security.failedLoginAttempts = (user.security.failedLoginAttempts || 0) + 1;
  user.security.lastFailedLoginAt = new Date();

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION_MS = 15 * 60 * 1000;

  if (user.security.failedLoginAttempts >= MAX_ATTEMPTS) {
    user.security.lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
    user.security.lockoutCount = (user.security.lockoutCount || 0) + 1;
    return { locked: true, attemptsRemaining: 0 };
  }

  return { locked: false, attemptsRemaining: MAX_ATTEMPTS - user.security.failedLoginAttempts };
};

export const revokeRefreshTokenFromRequest = async (req, reason) => {
  const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
  if (refreshToken) {
    res.cookie(REFRESH_COOKIE_NAME, '', { maxAge: 0 });
  }
  return { success: true };
};

export const DUMMY_PASSWORD_HASH = '$2a$10$dummy.hash.for.timing.attack.prevention';

export default {
  PASSWORD_REGEX,
  INVALID_CREDENTIALS_MESSAGE,
  ACCOUNT_LOCKED_MESSAGE,
  hashPassword,
  comparePassword,
  hashRefreshToken,
  getActiveLockoutUntil,
  getRefreshTtlMs,
  getUserAgent,
  buildCookieOptions,
  buildCsrfCookieOptions,
  buildRefreshCookieOptions,
  REFRESH_COOKIE_NAME,
  issueRefreshTokenValue,
  signAccessToken,
  issueCsrfToken,
  issueSession,
  resetSigninSecurityState,
  recordFailedSigninAttempt,
  revokeRefreshTokenFromRequest,
  DUMMY_PASSWORD_HASH
};
