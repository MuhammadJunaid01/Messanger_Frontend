import React, { useEffect, useState, useRef } from "react";
import "./registration.css";
import axios from "axios";
import { io } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import { host, loginApi, registerApi, test } from "./../../api/api";
import { useNavigate } from "react-router-dom";
import Login from "../login/Login";
import Auth from "./../../hooks/auth";

const Registration = () => {
  const socket = io("http://localhost:5000");
  const { user, currentUser, loginUser, currentuser } = Auth();
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conFirmedPass, setConFirmedPass] = useState("");
  const [error, setError] = useState(false);
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();
  const handleToggle = () => {
    setCheck((check) => !check);
    console.log("check", check);
  };

  useEffect(() => {
    currentUser();
  }, []);
  // useEffect(() => {
  //   socket.connect();
  // }, [currentuser]);
  useEffect(() => {
    if (user) {
      const db = JSON.parse(localStorage.getItem("chat-app-user"));
      if (db?.token) {
        navigate("/chat");
      } else {
        navigate("/");
      }
    } else {
      currentUser();
      return;
    }
  }, [user]);
  const handleRegistration = (e) => {
    e.preventDefault();
    // socket.connect();
    if (name && password && email === "") {
      alert("please full fill registration form");
      return;
    }
    if (file === null) {
      alert("please set your profile picture!");
      return;
    }
    if (password !== conFirmedPass) {
      setError(true);
      toast.error(" Password Not matched!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", file);
    formData.forEach((f) => {
      console.log("f: ", f);
    });
    axios
      .post(registerApi, formData)
      .then((res) => {
        console.log(res);
        if (res.data.message === "user succesfully register") {
          loginUser(email, password);
        }
      })
      .catch((error) => {
        console.log("err", error.message);
        setError(true);
        toast.error("🦄 This Email allready Registerd!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        return;
      });
  };
  const handleimage = (e) => {
    setFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="registration_container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="registration_content">
        <div className="RG_card">
          <div className="btn_gropu">
            <button
              onClick={handleToggle}
              className={`btn_collapse ${check ? "selected" : ""}`}
            >
              Register
            </button>
            <button
              onClick={handleToggle}
              className={`btn_collapse ${check ? "" : "selected"}`}
            >
              Login
            </button>
          </div>
          {check ? (
            <div>
              <div className="formTitle">
                <h1> Register</h1>
                <hr />
              </div>
              <form onSubmit={handleRegistration}>
                <input
                  required
                  onBlur={(e) => setName(e.target.value)}
                  className="inputFeild"
                  type="text"
                  name="name"
                  placeholder="Enter Your Name:"
                />

                <input
                  required
                  onBlur={(e) => setEmail(e.target.value)}
                  className="inputFeild"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email:"
                />
                <div className="file_image">
                  {image && <img className="preview_img" src={image} alt="" />}
                  <input
                    className="file"
                    onChange={handleimage}
                    type="file"
                    name="file"
                    id=""
                  />
                </div>
                <input
                  required
                  onBlur={(e) => setPassword(e.target.value)}
                  className="inputFeild"
                  type="password"
                  placeholder="Enter Your Password:"
                  name="password"
                />
                <input
                  required
                  onBlur={(e) => setConFirmedPass(e.target.value)}
                  className="inputFeild"
                  type="password"
                  placeholder="Confirmed Your Password"
                />

                <input className="submit_btn" type="submit" value="Register" />
              </form>
            </div>
          ) : (
            <div>
              <Login />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
