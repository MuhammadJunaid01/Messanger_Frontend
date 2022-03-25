import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate, NavLink, Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Auth from "../../hooks/auth";
import { baseUrlImage, getallUsers } from "./../../api/api";
import axios from "axios";
import "./chat.css";
import {
  FaHouseDamage,
  FaBars,
  FaRegCommentDots,
  FaRegBell,
  FaRegSun,
  FaSignOutAlt,
} from "react-icons/fa";

const Chat = () => {
  const navigate = useNavigate();
  const { user, currentUser, logot, userProfilePic, data } = Auth();
  const [users, setUsers] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const db = JSON?.parse(localStorage.getItem("chat-app-user"));
  const token = db?.token;
  const { exp } = jwt_decode(token);
  const expirationTime = exp * 1000;

  useEffect(() => {
    if (db) {
      navigate("/chat/home");
    }
    if (expirationTime < Date.now()) {
      alert("hi storage");
      // set LocalStorage here based on response;
      localStorage.clear();
      navigate("/");
    }
    currentUser();
    axios
      .get(getallUsers)
      .then(function (response) {
        setIsloading(true);
        setUsers(response.data.users);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  const nabiGate = () => {
    navigate("/");
  };

  return user ? (
    <div className="chat_container">
      <Container fluid>
        <Row>
          <Col xs={12} md={2} lg={1}>
            <div className="side_bar_profile_menu">
              <div className="side_nav_container">
                <div className="user_profile_picture">
                  <img src={baseUrlImage + userProfilePic} alt="" />
                </div>
                <div className="kkk">
                  <div className="side_nav_icon">
                    <NavLink
                      style={{ color: "white" }}
                      className={(navData) =>
                        navData.isActive ? "select" : ""
                      }
                      to="/chat/home"
                    >
                      <FaHouseDamage />
                    </NavLink>
                  </div>

                  <div className="side_nav_icon ">
                    <NavLink
                      style={{ color: "white" }}
                      className={(navData) =>
                        navData.isActive ? "select" : ""
                      }
                      to="/chat/inbox"
                    >
                      <FaRegCommentDots />
                    </NavLink>
                  </div>
                  <div className="side_nav_icon">
                    <NavLink
                      style={{ color: "white" }}
                      className={(navData) =>
                        navData.isActive ? "select" : ""
                      }
                      to="/chat/notification"
                    >
                      <FaRegBell />
                    </NavLink>
                  </div>
                  <div className="side_nav_icon">
                    <FaRegSun />
                  </div>
                  <div className="logout">
                    <FaSignOutAlt onClick={logot} />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={10} lg={11}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  ) : (
    <div>
      <h1>User Not Found Please Register Or Login</h1>
    </div>
  );
};

export default Chat;
