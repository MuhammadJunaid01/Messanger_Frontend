import React from "react";
import { FaPhoneAlt, FaVideo, FaTelegramPlane } from "react-icons/fa";
import { baseUrlImage } from "../../api/api";
import "./messages.css";
import { AiOutlineMore } from "react-icons/ai";

const Messages = ({ selectUser }) => {
  return (
    <div className="messages_container">
      <div className="messages_nav">
        <div className="user_profile">
          <div className="slected_user_profile_picture">
            <img src={baseUrlImage + selectUser.image} alt="kkkkk" />
          </div>
          <div className="selected_user_name">
            <h4>{selectUser.username}</h4>
          </div>
        </div>

        <div className="selected_user_call_info">
          <h3>
            <FaPhoneAlt />
          </h3>
          <h3>
            <FaVideo />
          </h3>
          <h3>
            <AiOutlineMore />
          </h3>
        </div>
      </div>
      <hr />

      <div className="message_input">
        <input type="text" placeholder="Write Your Message" />
      </div>
    </div>
  );
};

export default Messages;
