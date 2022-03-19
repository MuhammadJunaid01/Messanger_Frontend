import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "../components/registration/Registration";
import Chat from "./../components/chat/Chat";
const RoutePage = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
};

export default RoutePage;
