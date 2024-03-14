import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoggingIn(true);

    setTimeout(async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await fetch(`${apiUrl}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.status === 401) {
          setIsSuccess(false);
          setMessage("Login failed");
          setIsLoggingIn(false);
        } else {
          setIsSuccess(true);
          setMessage("Login successful. Redirecting shortly...");
          localStorage.setItem("token", data.token);
          login(data.token);
          setTimeout(() => navigate("/dashboard"), 2000);
        }
      } catch (error) {
        console.error("Login error:", error);
        setIsSuccess(false);
        setMessage("Login failed");
        setIsLoggingIn(false);
      }
    }, 200);
  };

  return (
    <div id="form-container">
      {message && (
        <div
          style={{ color: isSuccess ? "green" : "red", marginBottom: "10px" }}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} style={{ padding: "10px" }}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            disabled={isLoggingIn}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            disabled={isLoggingIn}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" id="submit-button" disabled={isLoggingIn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
