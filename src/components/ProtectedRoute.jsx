"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROUTE_ACCESS, ROUTE_PERMISSIONS, hasAnyPermission } from '@/utils/auth';
import { Icon } from "@iconify/react/dist/iconify.js";

const ProtectedRoute = ({ children, requiredPermissions = [], requiredRoles = [] }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [redirecting, setRedirecting] = useState(false); // NEW

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Check authorization
      const hasRequiredPermissions = requiredPermissions.length === 0 ||
        hasAnyPermission(parsedUser.role, requiredPermissions);
      const hasRequiredRole = requiredRoles.length === 0 ||
        requiredRoles.includes(parsedUser.role);

      setAuthorized(hasRequiredPermissions && hasRequiredRole);
      setLoading(false);
    } else {
      router.push('/login');
      return; // Prevent further execution and state updates
    }
    // Only run once on mount
  }, []);

  if (loading || redirecting) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  if (!authorized) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <Icon icon="solar:shield-cross-outline" className="text-danger mb-3" style={{ fontSize: '64px' }} />
          <h3 className="text-danger mb-2">Access Denied</h3>
          <p className="text-secondary-light mb-4">
            You don't have permission to access this page.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
