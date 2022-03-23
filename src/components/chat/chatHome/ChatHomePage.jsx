import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { baseUrlImage, getallUsers } from "./../../../api/api";
import { FaSistrix } from "react-icons/fa";
import axios from "axios";
import userSayHi from "../../../asset/user-hi-message.gif";
import Auth from "../../../hooks/auth";
import "./chatHome.css";
import userLoader from "../../../asset/userLoader.gif";
import Messages from "../../messages/Messages";
const ChatHomePage = () => {
  const { currentUser, currentuser } = Auth();
  const [users, setUsers] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [selectUser, setSelectuser] = useState(undefined);
  useEffect(() => {
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
  console.log(isloading);
  const slectedUser = (user) => {
    setSelectuser(user);
  };
  console.log("selected user", selectUser);
  return (
    <div className="chat_home_conainer">
      <Row>
        <Col xs={12} md={4} lg={4}>
          <div className="users_container">
            <div className="search_bar">
              <div className="search_icon">
                <FaSistrix />
              </div>
              <input type="text" placeholder="Search" />
            </div>
            <div className="title">
              <h3>Pepole</h3>
            </div>
            {isloading ? (
              <div className="user_loader">
                <h4>Loading.......</h4>
                <img src={userLoader} alt="" />
              </div>
            ) : (
              ""
            )}
            {users?.map((user, index) => (
              <div key={index}>
                <div onClick={() => slectedUser(user)} className="user">
                  <div className="pepole_profile_picture">
                    <img src={baseUrlImage + user?.image} alt="" />
                  </div>
                  <div className="user_name">
                    <p>{user.username}</p>
                  </div>
                  <div className="message_time">
                    <p>Today:9:52</p>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </Col>
        <Col xs={12} md={8} lg={8}>
          {selectUser ? (
            <Messages selectUser={selectUser} />
          ) : (
            <div className="message_container">
              <div className="user_hi_message">
                <img src={userSayHi} alt="" />
                <div className="welCome">
                  <h5>
                    Welcome,
                    <i className="user_name_say_hi"> {currentuser?.username}</i>
                  </h5>
                  <p>Please Select a chat to Start Messagin...</p>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ChatHomePage;
