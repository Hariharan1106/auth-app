# EatWisely - Project Summary & Checklists

## Project Overview

**EatWisely** is a full-stack MERN (MongoDB, Express, React, Node.js) restaurant management system with:

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: Express.js API with MongoDB/Mongoose
- **Caching**: Redis for session/caching
- **Authentication**: JWT with rotation, role-based access control (RBAC)
- **Observability**: OpenTelemetry tracing, Prometheus metrics
- **Security**: CSRF protection, rate limiting, login lockout

---

## Project Structure

```
auth-app/
├── api/                    # Express.js backend
│   ├── controllers/        # Request handlers
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── repositories/       # Data access layer
│   ├── middlewares/        # Express middlewares
│   ├── utils/              # Utilities (auth, validation, etc.)
│   ├── tests/              # Test files
│   ├── docs/               # Swagger documentation
│   ├── migrations/         # Database migrations
│   ├── tracing.js          # OpenTelemetry setup
│   ├── app.js              # Express app entry
│   └── config.js           # Configuration
├── src/                    # React frontend
│   ├── pages/              # Page components
│   ├── components/         # Reusable components
│   ├── utils/              # Frontend utilities
│   ├── App.jsx             # Main app component
│   └── main.jsx            # React entry point
├── .env                    # Environment variables
├── package.json            # Dependencies
└── vite.config.js          # Vite configuration
```

---

## Pre-Development Checklist

### Environment Setup
- [ ] Node.js 18+ installed
- [ ] MongoDB Atlas account configured
- [ ] Redis instance configured (or use cloud Redis)
- [ ] `.env` file filled with actual credentials

### Dependencies
- [ ] Run `npm install` successfully
- [ ] No peer dependency conflicts
- [ ] All dev dependencies installed

### Configuration
- [ ] `MONGO` - MongoDB connection string
- [ ] `JWT_SECRET` - Strong secret key (min 32 chars)
- [ ] `REDIS_URL` - Redis connection string
- [ ] `CORS_ORIGINS` - Allowed origins configured
- [ ] `PORT` - Server port (default 3000)

### Security
- [ ] JWT_SECRET changed from default/dev value
- [ ] Redis credentials not exposed in code
- [ ] MongoDB credentials use environment variables
- [ ] HTTPS enabled in production

---

## Development Checklist

### Backend
- [ ] API server starts without errors (`npm run dev`)
- [ ] Health check endpoints working (`/api/health`, `/api/live`, `/api/ready`)
- [ ] Swagger docs accessible at `/api/docs`
- [ ] All routes respond correctly
- [ ] JWT authentication working
- [ ] Role-based access control enforced
- [ ] Rate limiting configured
- [ ] Redis caching functional

### Frontend
- [ ] Vite dev server starts (`npm run dev`)
- [ ] Login page renders and functions
- [ ] Signup page renders and functions
- [ ] User dashboard accessible after login
- [ ] Admin panel accessible for admin users
- [ ] Role-based navigation working
- [ ] API calls properly handle auth tokens
- [ ] Responsive design works on mobile

### Integration
- [ ] Frontend communicates with backend API
- [ ] Authentication state persists (token storage)
- [ ] Logout clears session properly
- [ ] Error handling shows user-friendly messages

---

## Testing Checklist

### Unit Tests
```bash
npm test
```
- [ ] Auth service tests pass
- [ ] User/Admin service tests pass
- [ ] Controller branch tests pass
- [ ] Validation tests pass

### Integration Tests
```bash
npm test
```
- [ ] Auth integration tests pass
- [ ] Controller integration tests pass
- [ ] System integration tests pass
- [ ] RBAC contract tests pass

### End-to-End Tests
```bash
npm run test:e2e
```
- [ ] Smoke test passes
- [ ] All critical user flows work

### Load Tests
```bash
npm run test:load
```
- [ ] Auth load tests pass
- [ ] System handles expected load

### Coverage
```bash
npm run test:coverage
```
- [ ] Unit test coverage > 80%
- [ ] Integration test coverage > 70%

### Linting
```bash
npm run lint
```
- [ ] No ESLint errors
- [ ] Code follows project conventions

---

## Deployment Checklist

### Pre-Deployment
- [ ] All tests passing
- [ ] No lint errors
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables set for production

### Security
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] Redis credentials are secure
- [ ] CORS origins properly configured
- [ ] HTTPS enabled
- [ ] Rate limiting enabled in production

### Production Build
- [ ] Frontend builds without errors
- [ ] API starts in production mode
- [ ] Health checks pass
- [ ] Metrics endpoint accessible
- [ ] Tracing disabled or properly configured

---

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | User registration |
| POST | `/api/auth/signin` | User login |
| POST | `/api/auth/signout` | User logout |
| GET | `/api/auth/refresh` | Refresh token |
| GET | `/api/users` | Get users (paginated) |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| GET | `/api/admin/users` | Admin user management |
| GET | `/api/restaurants` | List restaurants |
| POST | `/api/restaurants` | Create restaurant |
| GET | `/api/categories` | List categories |
| GET | `/api/menus` | List menus |
| GET | `/api/auditlogs` | Get audit logs |
| GET | `/api/reviews` | Get reviews |
| GET | `/api/health` | Health check |
| GET | `/api/metrics` | Prometheus metrics |
| GET | `/api/docs` | Swagger documentation |

---

## Known Issues / TODO

- [ ] Review README accuracy vs actual implementation
- [ ] Verify all API routes match frontend expectations
- [ ] Check if Redis connection handling is robust
- [ ] Ensure proper error handling across all routes

---

## Quick Commands

```bash
# Development
npm run dev          # Start backend with nodemon
npm run dev          # Start frontend with Vite (check package.json)

# Testing
npm test             # Run all tests
npm run test:e2e     # Run E2E smoke tests
npm run test:coverage # Run with coverage

# Database
npm run migrate      # Run migrations
npm run seed         # Seed database
npm run migrate:status # Check migration status

# Linting
npm run lint         # Run ESLint
```
