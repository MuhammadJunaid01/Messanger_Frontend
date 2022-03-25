import React, { useState } from "react";
import { FaPhoneAlt, FaVideo, FaTelegramPlane, FaWaze } from "react-icons/fa";
import { baseUrlImage } from "../../api/api";
import "./messages.css";
import { AiOutlineMore } from "react-icons/ai";
import Picker from "emoji-picker-react";
import Message from "./message/Message";

const Messages = ({ selectPepole }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const handleShowEmoji = () => {
    setShowEmoji((show) => !show);
  };
  const sendMessage = () => {
    setMsg(message);
  };
  return (
    <div className="messages_container">
      <div className="messages_nav">
        <div className="user_profile">
          <div className="slected_user_profile_picture">
            <img src={baseUrlImage + selectPepole.image} alt="kkkkk" />
          </div>
          <div className="selected_user_name">
            <h4>{selectPepole.username}</h4>
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
      <Message msg={msg} />
      {showEmoji ? (
        <div className="emoji_picker">
          <Picker
            // pickerStyle={{ height: "100px" }}
            onEmojiClick={onEmojiClick}
          />
        </div>
      ) : null}
      <div className="message_input">
        <div className="send_message_icon">
          <FaTelegramPlane />
        </div>

        <div className="select_emoji">
          <FaWaze onClick={handleShowEmoji} />
        </div>

        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Write Your Message"
          defaultValue={chosenEmoji?.emoji}
        />
      </div>
    </div>
  );
};

export default Messages;
