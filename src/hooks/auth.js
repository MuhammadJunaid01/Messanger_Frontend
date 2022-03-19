import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { loginApi } from "../api/api";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const loginUser = (email, password) => {
    axios
      .post(loginApi, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.statusText === "OK") {
          localStorage.setItem("chat-app-user", JSON.stringify(res.data.user));
        }
        navigate("/chat");

        if (res.data.status === false) {
          toast.error(" user not authenticated", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })

      .catch((error) => {
        console.log("hello");

        console.log("hello err", error);
      });
  };
  //current user
  const currentUser = () => {
    const db = JSON.parse(localStorage.getItem("chat-app-user"));
    const Cuser = db.username;
    setUser(Cuser);
    console.log(Cuser);
  };

  // log out

  const logot = () => {
    localStorage.clear();
    navigate("/");
  };
  return {
    loginUser,
    currentUser,
    user,
    logot,
  };
};

export default Auth;
