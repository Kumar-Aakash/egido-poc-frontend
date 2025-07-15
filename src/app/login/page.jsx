// This component MUST have "use client" at the top if using App Router.
"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; // Still useful for the "Login" button if you keep it visible
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation'; // For App Router's useRouter

export default function CustomLogin() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const signUpLinkRef = useRef(null); // Ref to target the Sign Up link
  const [showLoginPage, setShowLoginPage] = useState(false); // State to control page visibility

  useEffect(() => {
    if (user && !isLoading) {
      // If user is already logged in, redirect them
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get('returnTo') || '/document-management';
      
      // Set the user in localStorage to prevent recursion
      const authUser = {
        id: user.sub,
        name: user.name || user.nickname || user.email,
        email: user.email,
        role: 'admin' // Default role, you can customize this
      };
      localStorage.setItem('authUser', JSON.stringify(authUser));
      
      router.push(returnTo);
    } else if (!isLoading && !user) {
      // If not loading and no user, attempt to click the sign-up link
      // Set a timeout to ensure the DOM element is rendered before attempting to click.
      // A small delay can prevent issues with quick component mounting.
      const timer = setTimeout(() => {
        if (signUpLinkRef.current) {
          signUpLinkRef.current.click();
        } else {
          // Fallback: if ref is not available, show the page (e.g., if rendering too fast)
          setShowLoginPage(true);
        }
      }, 50); // Small delay
    }
  }, [user, isLoading, router]);

  // If loading, show a simple message
  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <p className="text-center text-muted">Loading authentication...</p>
      </div>
    );
  }

  // If user is logged in, return null as they will be redirected by the useEffect above
  if (user) {
    return null;
  }

  // If no user and not redirecting automatically, show the login page
  // The showLoginPage state ensures that the full UI is only rendered
  // if the automatic redirect to signup doesn't occur immediately.
  if (!showLoginPage) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <p className="text-center text-muted">Taking you to Login screen</p>
        {/* Render the link hidden for the programmatic click */}
        <a
          ref={signUpLinkRef}
          href="/api/auth/login?screen_hint=Taking you to Login screen"
          style={{ display: 'none' }} // Hide the link visually
          aria-hidden="true" // Hide from screen readers
        >
          Sign Up Now
        </a>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5 text-center">
                <h3 className="fw-bold text-primary mb-4">Sign in to your account</h3>
                <p className="text-muted mb-4">
                  Access your personalized dashboard and features.
                </p>

                <div className="d-grid gap-2">
                  <Link href="/api/auth/login" passHref>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg w-100 py-2"
                      style={{
                        backgroundColor: '#FF7043',
                        borderColor: '#FF7043',
                        transition: 'background-color 0.3s ease, border-color 0.3s ease',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E65100'; e.currentTarget.style.borderColor = '#E65100'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FF7043'; e.currentTarget.style.borderColor = '#FF7043'; }}
                    >
                      Login with Auth0
                    </button>
                  </Link>
                </div>

                <p className="mt-4 text-muted">
                  Don't have an account?{' '}
                  <a
                    ref={signUpLinkRef} // Assign the ref here
                    href="/api/auth/login?screen_hint=signup"
                    className="text-decoration-none text-info"
                  >
                    Sign Up Now
                  </a>
                </p>
                <p className="mt-3 text-secondary" style={{ fontSize: '0.85em' }}>
                  Secure authentication powered by Auth0.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}