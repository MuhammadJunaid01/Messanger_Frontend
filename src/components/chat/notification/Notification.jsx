import React from "react";
import { Row, Col } from "react-bootstrap";
import "./notification.css";
const Notification = () => {
  return (
    <div>
      <Row>
        <Col xs={12} md={4} lg={4}>
          <div className="notificatio_container">
            <h1>hello notification</h1>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Notification;
