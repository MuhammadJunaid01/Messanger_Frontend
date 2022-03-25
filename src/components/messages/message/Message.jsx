import React from "react";
import "./message.css";
const Message = ({ msg }) => {
  console.log("msg", msg);
  return (
    <div className="message_container">
      <p>{msg}</p>
    </div>
  );
};

export default Message;
