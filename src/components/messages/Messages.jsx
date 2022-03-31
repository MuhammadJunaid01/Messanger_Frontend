import React, { useEffect, useState, useRef } from "react";
import { FaPhoneAlt, FaVideo, FaTelegramPlane, FaWaze } from "react-icons/fa";
import { baseUrlImage, getAllMessage, host, sendMesage } from "../../api/api";
import "./messages.css";
import { AiOutlineMore } from "react-icons/ai";
import Picker from "emoji-picker-react";
import Message from "./message/Message";
import Auth from "./../../hooks/auth";
import axios from "axios";
import { io } from "socket.io-client";
const Messages = ({ selectPepole }) => {
  const socket = io(host);
  const { currentUser, currentuser } = Auth();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivaMessage] = useState(null);
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
  };
  useEffect(() => {
    currentUser();
  }, [selectPepole]);
  useEffect(() => {
    if (currentuser) {
      socket.emit("add-user", currentuser._id);
    }
  }, [currentuser]);
  const handleShowEmoji = () => {
    setShowEmoji((show) => !show);
  };
  const sendMessage = async () => {
    socket.connect();
    await axios.post(sendMesage, {
      from: currentuser?._id,
      to: selectPepole?._id,
      message: message,
    });
    socket.emit("send-msg", {
      to: selectPepole._id,
      from: currentuser._id,
      message: message,
    });
    const msg = [...messages];
    msg.push({ fromSelf: true, message: msg });
    setMessage(msg);
  };
  useEffect(() => {
    socket.on("msg-recieve", (msg) => {
      console.log("message recived", msg);
      setArrivaMessage({ fromSelf: false, message: msg });
    });
  });
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(async () => {
    if (currentuser) {
      const res = await axios.post(getAllMessage, {
        from: currentuser?._id,
        to: selectPepole?._id,
      });
      setMessages(res.data.msg);
    }
  }, [currentuser, selectPepole]);
  console.log("arrrr", messages);
  return (
    <div className="messages_container">
      <div className="messages_nav">
        <div className="user_profile">
          <div className="slected_user_profile_picture">
            <img
              src={baseUrlImage + selectPepole?.image}
              alt="selected user image"
            />
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
      <div className="message_content">
        <Message messages={messages} />
      </div>

      {showEmoji ? (
        <div className="emoji_picker">
          <Picker
            onClick={handleShowEmoji}
            // pickerStyle={{ height: "100px" }}
            onEmojiClick={onEmojiClick}
          />
        </div>
      ) : null}
      <div className="message_input">
        <div className="send_message_icon">
          <FaTelegramPlane onClick={sendMessage} />
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
          defaultValue={chosenEmoji}
        />
      </div>
    </div>
  );
};

export default Messages;
