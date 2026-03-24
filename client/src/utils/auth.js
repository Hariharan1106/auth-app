export const ROLES = {
  USER: 'user',
  OWNER: 'owner',
  ADMIN: 'admin',
  SUPER_ADMIN: 'superAdmin',
  STORE_MANAGER: 'storeManager',
};

export const getDefaultRouteByRole = (role) => {
  switch (role) {
    case 'superAdmin':
      return '/superAdmin';
    case 'admin':
      return '/admin';
    case 'storeManager':
      return '/manager';
    case 'owner':
      return '/manager';
    case 'user':
    default:
      return '/user-dashboard';
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
