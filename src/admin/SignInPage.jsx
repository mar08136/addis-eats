import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

function SignInPage() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const success = login(username, password);

    if (success) {
      navigate("/admin", { replace: true });
      return;
    }

    setError("Invalid username or password.");
  }

  return (
    <main className="signin-page">
      <div className="signin-card">
        <p className="signin-label">ADDIS EATS</p>

        <h1>Admin Sign In</h1>

        <p className="signin-subtitle">
          Sign in to manage your restaurant.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </label>

          {error && (
            <p className="signin-error">{error}</p>
          )}

          <button type="submit">
            Sign In
          </button>
        </form>

        <p className="signin-demo">
          Username: admin · Password: admin123
        </p>
      </div>
    </main>
  );
}

export default SignInPage;