import React, { useState, useEffect } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const navigate = useNavigate();

  // Generate captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let text = "";
    for (let i = 0; i < 4; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(text);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = async () => {
    if (captchaInput.toUpperCase() !== captcha.toUpperCase()) {
      alert("Captcha does not match!");
      generateCaptcha(); // refresh captcha
      return;
    }

    try {
      await login(username, password);
      localStorage.setItem("isAuthenticated", "true");
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="center-layout">
      <div className="auth-container">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Captcha Section */}
        <div
          className="captcha-box"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "15px 0",
          }}
        >
          <span
            className="captcha-text"
            style={{
              fontSize: "36px", // 🔥 Big letters
              fontWeight: "bold",
              letterSpacing: "10px",
              background: "#f0f0f0",
              padding: "10px 20px",
              borderRadius: "8px",
              userSelect: "none",
            }}
          >
            {captcha}
          </span>
          <button type="button" onClick={generateCaptcha}>
            Refresh
          </button>
        </div>

        <input
          type="text"
          placeholder="Enter Captcha"
          value={captchaInput}
          onChange={(e) => setCaptchaInput(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
