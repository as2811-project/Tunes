import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function NavBar({ handleLogout }) {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");

  const logout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("useremail");
    handleLogout();
    navigate("/login");
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Conditional rendering based on useremail */}
          {!user && (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/subscriptions">Subscriptions</Link>
              </li>
            </>
          )}
        </ul>
        <div className="flex items-center">
          {user && (
            <div className="mr-4">
              {/* Display username */}
              <span className="text-gray-500">
                {user.replace(/^"(.*)"$/, "$1")}
              </span>
            </div>
          )}
          {user && (
            <button onClick={logout} className="mr-4">
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
