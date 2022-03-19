import React from "react";
import { useNavigate } from "react-router-dom";

const CheckToken = () => {
  const findToken = () => {
    const db = JSON.parse(localStorage.getItem("chat-app-user"));
    console.log("dbbbb", db.token);
  };
  return {
    findToken,
  };
};

export default CheckToken;
