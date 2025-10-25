import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <div className="container py-5 text-center">Loading...</div>;

  return (
    <main className="container py-5 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: 400 }}>
        <h1 className="h3 fw-bold text-success mb-3 text-center">Account</h1>
        {isAuthenticated && user ? (
          <>
            <div className="d-flex flex-column align-items-center mb-3">
              {user.picture && <img src={user.picture} alt="avatar" className="rounded-circle mb-2" style={{ width: 72, height: 72 }} />}
              <div className="fw-semibold">{user.name || user.email}</div>
              {user.email && <div className="text-muted small">{user.email}</div>}
            </div>
            <button className="btn btn-outline-danger w-100 rounded-pill" onClick={() => logout()}>Log Out</button>
          </>
        ) : (
          <>
            <div className="mb-3 text-center">Sign in to personalize your experience and save your progress.</div>
            <button className="btn btn-primary w-100 rounded-pill" onClick={() => loginWithRedirect()}>Log In / Sign Up</button>
          </>
        )}
      </div>
    </main>
  );
};

export default LoginPage;
