import React from "react";
import { Alert } from "antd";

const Message = ({ message, type, closable }) => {
  return (
    <Alert
      className="max-w-full"
      message={message}
      type={type}
      banner
      closable={closable}
    />
  );
};

Message.defaultProps = {
  type: "info",
};

export default Message;
