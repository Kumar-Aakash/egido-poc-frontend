// User roles
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  CASE_OFFICER: 'case_officer',
  CLIENT: 'client',
  SYSTEM: 'system'
};

// Role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
  [ROLES.SUPER_ADMIN]: 5,
  [ROLES.ADMIN]: 4,
  [ROLES.CASE_OFFICER]: 3,
  [ROLES.CLIENT]: 2,
  [ROLES.SYSTEM]: 1
};

// Permissions for each role
export const PERMISSIONS = {
  // Document Management
  DOCUMENT_UPLOAD: 'document_upload',
  DOCUMENT_VIEW: 'document_view',
  DOCUMENT_EDIT: 'document_edit',
  DOCUMENT_DELETE: 'document_delete',
  DOCUMENT_SEND: 'document_send',
  DOCUMENT_SIGN: 'document_sign',
  DOCUMENT_REJECT: 'document_reject',
  
  // Package Management
  PACKAGE_CREATE: 'package_create',
  PACKAGE_VIEW: 'package_view',
  PACKAGE_EDIT: 'package_edit',
  PACKAGE_DELETE: 'package_delete',
  PACKAGE_SEND: 'package_send',
  PACKAGE_ARCHIVE: 'package_archive',
  
  // User Management
  USER_CREATE: 'user_create',
  USER_VIEW: 'user_view',
  USER_EDIT: 'user_edit',
  USER_DELETE: 'user_delete',
  USER_ASSIGN_ROLE: 'user_assign_role',
  
  // System Management
  SYSTEM_CONFIG: 'system_config',
  SYSTEM_LOGS: 'system_logs',
  SYSTEM_AUDIT: 'system_audit',
  
  // Dashboard Access
  DASHBOARD_MAIN: 'dashboard_main',
  DASHBOARD_ANALYTICS: 'dashboard_analytics',
  DASHBOARD_REPORTS: 'dashboard_reports',
  
  // Client Portal
  CLIENT_PORTAL_ACCESS: 'client_portal_access',
  CLIENT_DOCUMENT_REVIEW: 'client_document_review',
  CLIENT_DOCUMENT_SIGN: 'client_document_sign'
};

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    // All permissions
    ...Object.values(PERMISSIONS)
  ],
  
  [ROLES.ADMIN]: [
    // Document Management
    PERMISSIONS.DOCUMENT_UPLOAD,
    PERMISSIONS.DOCUMENT_VIEW,
    PERMISSIONS.DOCUMENT_EDIT,
    PERMISSIONS.DOCUMENT_DELETE,
    PERMISSIONS.DOCUMENT_SEND,
    
    // Package Management
    PERMISSIONS.PACKAGE_CREATE,
    PERMISSIONS.PACKAGE_VIEW,
    PERMISSIONS.PACKAGE_EDIT,
    PERMISSIONS.PACKAGE_DELETE,
    PERMISSIONS.PACKAGE_SEND,
    PERMISSIONS.PACKAGE_ARCHIVE,
    
    // User Management
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_VIEW,
    PERMISSIONS.USER_EDIT,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.USER_ASSIGN_ROLE,
    
    // Dashboard Access
    PERMISSIONS.DASHBOARD_MAIN,
    PERMISSIONS.DASHBOARD_ANALYTICS,
    PERMISSIONS.DASHBOARD_REPORTS,
    
    // System Management (limited)
    PERMISSIONS.SYSTEM_LOGS,
    PERMISSIONS.SYSTEM_AUDIT
  ],
  
  [ROLES.CASE_OFFICER]: [
    // Document Management
    PERMISSIONS.DOCUMENT_UPLOAD,
    PERMISSIONS.DOCUMENT_VIEW,
    PERMISSIONS.DOCUMENT_EDIT,
    PERMISSIONS.DOCUMENT_SEND,
    
    // Package Management
    PERMISSIONS.PACKAGE_CREATE,
    PERMISSIONS.PACKAGE_VIEW,
    PERMISSIONS.PACKAGE_EDIT,
    PERMISSIONS.PACKAGE_SEND,
    
    // Dashboard Access
    PERMISSIONS.DASHBOARD_MAIN,
    PERMISSIONS.DASHBOARD_ANALYTICS,
    
    // Limited user management
    PERMISSIONS.USER_VIEW
  ],
  
  [ROLES.CLIENT]: [
    // Client Portal
    PERMISSIONS.CLIENT_PORTAL_ACCESS,
    PERMISSIONS.CLIENT_DOCUMENT_REVIEW,
    PERMISSIONS.CLIENT_DOCUMENT_SIGN,
    
    // Document Management (limited)
    PERMISSIONS.DOCUMENT_VIEW,
    PERMISSIONS.DOCUMENT_SIGN,
    PERMISSIONS.DOCUMENT_REJECT
  ],
  
  [ROLES.SYSTEM]: [
    // System operations only
    PERMISSIONS.SYSTEM_CONFIG,
    PERMISSIONS.SYSTEM_LOGS,
    PERMISSIONS.SYSTEM_AUDIT,
    PERMISSIONS.PACKAGE_ARCHIVE
  ]
};

// Utility functions
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
};

export const hasAnyPermission = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  if (!userRole || !permissions || !Array.isArray(permissions)) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
};

export const isRoleHigherThan = (userRole, targetRole) => {
  const userHierarchy = ROLE_HIERARCHY[userRole] || 0;
  const targetHierarchy = ROLE_HIERARCHY[targetRole] || 0;
  return userHierarchy > targetHierarchy;
};

export const canAccessRoute = (userRole, route) => {
  const routePermissions = {
    '/document-management': [PERMISSIONS.DASHBOARD_MAIN],
    '/document-upload': [PERMISSIONS.DOCUMENT_UPLOAD, PERMISSIONS.PACKAGE_CREATE],
    '/client-review': [PERMISSIONS.CLIENT_PORTAL_ACCESS, PERMISSIONS.CLIENT_DOCUMENT_REVIEW],
    '/admin': [PERMISSIONS.DASHBOARD_ANALYTICS, PERMISSIONS.USER_VIEW],
    '/system': [PERMISSIONS.SYSTEM_CONFIG],
    '/users': [PERMISSIONS.USER_VIEW],
    '/reports': [PERMISSIONS.DASHBOARD_REPORTS],
    '/audit': [PERMISSIONS.SYSTEM_AUDIT]
  };
  
  const requiredPermissions = routePermissions[route];
  if (!requiredPermissions) return true; // Open route
  
  return hasAnyPermission(userRole, requiredPermissions);
};

// Route access configuration
export const ROUTE_ACCESS = {
  PUBLIC: 'public',
  AUTHENTICATED: 'authenticated',
  ROLE_BASED: 'role_based'
};

export const ROUTE_PERMISSIONS = {
  '/': { access: ROUTE_ACCESS.AUTHENTICATED },
  '/login': { access: ROUTE_ACCESS.PUBLIC },
  '/register': { access: ROUTE_ACCESS.PUBLIC },
  '/document-management': { 
    access: ROUTE_ACCESS.ROLE_BASED, 
    permissions: [PERMISSIONS.DASHBOARD_MAIN],
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CASE_OFFICER]
  },
  '/document-upload': { 
    access: ROUTE_ACCESS.ROLE_BASED, 
    permissions: [PERMISSIONS.DOCUMENT_UPLOAD],
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.CASE_OFFICER]
  },
  '/client-review': { 
    access: ROUTE_ACCESS.ROLE_BASED, 
    permissions: [PERMISSIONS.CLIENT_PORTAL_ACCESS],
    roles: [ROLES.CLIENT]
  },
  '/admin': { 
    access: ROUTE_ACCESS.ROLE_BASED, 
    permissions: [PERMISSIONS.DASHBOARD_ANALYTICS],
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN]
  },
  '/users': { 
    access: ROUTE_ACCESS.ROLE_BASED, 
    permissions: [PERMISSIONS.USER_VIEW],
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN]
  },
  '/system': { 
    access: ROUTE_ACCESS.ROLE_BASED, 
    permissions: [PERMISSIONS.SYSTEM_CONFIG],
    roles: [ROLES.SUPER_ADMIN, ROLES.SYSTEM]
  }
};
