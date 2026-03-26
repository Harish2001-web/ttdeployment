import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register({ username, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-header">
            <div className="hotel-icon">🏨</div>
            <h1>Create Account</h1>
            <p>Join LuxeStay Admin Platform</p>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-login">
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <a href="/login" className="auth-link">Login here</a></p>
          </div>
        </div>

        <div className="auth-sidebar">
          <div className="sidebar-content">
            <h2>Get Started!</h2>
            <p>Start managing your hotel efficiently</p>
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">🔐</span>
                <span>Secure Account</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Quick Setup</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span>Easy to Use</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
