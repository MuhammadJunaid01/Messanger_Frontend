import React from "react";
import "./message.css";
const Message = ({ messages }) => {
  console.log("kkkkkkkkkkk", messages);
  return (
    <div className="message_container">
      {messages.map((msg, index) => {
        return (
          <div
            key={index}
            className={msg.fromSelf ? "myMessage" : "frindMessage"}
          >
            <h5
              className={
                msg.fromSelf ? "myMessageContent" : "friendMessageContent"
              }
            >
              {msg.message}
            </h5>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
