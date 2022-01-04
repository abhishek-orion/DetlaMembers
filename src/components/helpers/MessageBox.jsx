import React from "react";
import "../styles/MessageBox.css";

function MessageBox({ message, state }) {
  return (
    <div className={`messageContainer ${state}`}>
      <p>{message}</p>
    </div>
  );
}

export default MessageBox;
