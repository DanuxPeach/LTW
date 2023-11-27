import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "./Login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogoContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        LoginEmail: email,
        LoginPassword: password,
      });

      if (response.status === 200 && response.data && response.data.username) {
        const userData = response.data;
        localStorage.setItem('user', JSON.stringify(userData));
        navigate("/");
      } else {
        setError("Invalid credentials"); // Cập nhật thông báo lỗi
      }
    } catch (error) {
      setError("Login failed. Please try again."); // Xử lý lỗi từ server
    }
  };  

  return (
    <div className="login1">
      <div className="logo1" onClick={onLogoContainerClick}>
        <div className="kidtube2">Kidtube</div>
        <img className="logo-item" alt="" src="/group-2441.svg" />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div className="decor1">
        <img className="image-9-icon1" alt="" src="/image-91@2x.png" />
        <img className="image-10-icon1" alt="" src="/image-10@2x.png" />
      </div>
      <div className="log">
        <div className="email">
          <div className="password">
            <div className="pass" />
            <input
              className="give-us-the"
              placeholder="Type your password here ..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />  
          </div>
          <div className="pass" />
          <input
            className="give-us-the"
            placeholder="Give us the email ^_^"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="butt" onClick={handleLogin}>
          <div className="button2">Let’s go!</div>
        </button>
        <img className="log-child" alt="" src="/line-3.svg" />
        <img className="log-item" alt="" src="/line-3.svg" />
        <div className="and">
          <p className="and1">And</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
