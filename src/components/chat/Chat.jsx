import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Auth from "../../hooks/auth";
import { baseUrlImage, getallUsers } from "./../../api/api";
import axios from "axios";
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
    if (expirationTime < Date.now()) {
      alert("hi storage");
      // set LocalStorage here based on response;
      localStorage.clear();
      navigate("/");
      console.log("expire");
    }
    currentUser();
    axios
      .get(getallUsers)
      .then(function (response) {
        setIsloading(true);
        setUsers(response.data.users);
        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);
  console.log("chat app", data);
  return user ? (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <img
              style={{ height: "50px", width: "50px" }}
              src={baseUrlImage + userProfilePic}
              alt="lllll"
            />
            <h1>{user}</h1>
            {users?.map((user, index) => (
              <div key={index}>
                <li>{user.username}</li>
              </div>
            ))}
          </Col>
          <Col xs={12} md={4} lg={4}>
            <button onClick={logot}>logout</button>
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
