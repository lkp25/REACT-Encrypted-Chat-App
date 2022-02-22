import React, { useEffect } from "react";
import ChatMsg from "./ChatMsg";
import "../../chat.css";
import { chatContext } from "../../chatContext/ChatContext";
import { useContext, useState } from "react";

export default function ChatDisplay() {
  const { activeConversationTab, allMessages, privateKey } =
    useContext(chatContext);

  useEffect(() => {
    console.log(allMessages);
  });
  console.log(privateKey);

  return (
    <div>
      <div className="chat-display chatBorders">ChatDisplay:</div>
      {!activeConversationTab && (
        <p>Start a conversation to see messages here</p>
      )}
      {activeConversationTab &&
        allMessages[activeConversationTab.id].map((msg) => {
          return <ChatMsg msg={msg} key={Math.random().toString()} />;
        })}
    </div>
  );
}
