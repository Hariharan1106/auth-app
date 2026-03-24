export const ROLES = {
  User: 'user',
  Owner: 'owner',
  Admin: 'admin',
  SuperAdmin: 'superAdmin',
};

export const getDefaultRouteByRole = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'superAdmin':
      return '/dashboard';
    case 'owner':
      return '/dashboard';
    case 'user':
    default:
      return '/';
  }
};

export const getRoleFromUser = (user) => {
  return user?.role || user?.userRole || 'user';
};

export const isAdmin = (user) => {
  const role = getRoleFromUser(user);
  return role === 'admin' || role === 'superAdmin';
};

export const isOwner = (user) => {
  const role = getRoleFromUser(user);
  return role === 'owner';
};

export const isRoleAccessible = (userRole, allowedRoles) => {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};
