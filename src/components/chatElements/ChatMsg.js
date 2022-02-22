import React from "react";
import { useContext } from "react";
import "../../chat.css";
import { chatContext } from "../../chatContext/ChatContext";

export default function ChatMsg({ msg }) {
  const { username } = useContext(chatContext);
  return (
    <div
      className={`${
        username === msg.sender ? "hostMsg" : ""
      } chatBorders chatMsg-container`}
    >
      <div className="ChatMsg-header">
        <span style={{ fontWeight: "bold" }}>{msg.sender}</span>
        <span></span>
      </div>
      <div className="ChatMsg-content">{msg.message.toString()}</div>
    </div>
  );
}
