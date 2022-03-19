import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginApi } from "../../api/api";
import Auth from "../../hooks/auth";

const Login = () => {
  const { loginUser } = Auth();
  const [loginEamil, setLoginEamil] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(loginEamil, loginPassword);
    if (loginEamil === "") {
      alert("kkkkkkkkkk");
    }

    console.log("email", loginEamil, loginPassword);
  };
  return (
    <div>
      <div className="formTitle">
        <h1> Login</h1>
        <hr />
      </div>
      <form onSubmit={handleLogin}>
        <input
          onBlur={(e) => setLoginEamil(e.target.value)}
          className="inputFeild"
          type="email"
          placeholder="Enter Your Email:"
          autoComplete="off"
          required
        />

        <input
          onBlur={(e) => setLoginPassword(e.target.value)}
          className="inputFeild"
          type="password"
          placeholder="Enter Your Password:"
          required
        />
        <input className="submit_btn" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
