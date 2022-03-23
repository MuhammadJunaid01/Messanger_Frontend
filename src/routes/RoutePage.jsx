import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatHomePage from "../components/chat/chatHome/ChatHomePage";
import Notification from "../components/chat/notification/Notification";
import Registration from "../components/registration/Registration";
import Chat from "./../components/chat/Chat";
const RoutePage = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/chat" element={<Chat />}>
            <Route path="home" element={<ChatHomePage />} />
            <Route path="notification" element={<Notification />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default RoutePage;
