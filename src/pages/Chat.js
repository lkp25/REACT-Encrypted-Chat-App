import React from "react";
import ChatDisplay from "../components/chatElements/ChatDisplay";
import ChatInput from "../components/chatElements/ChatInput";
import ChatList from "../components/chatElements/ChatList";
import ChatTabs from "../components/chatElements/ChatTabs";
import "../chat.css";
import ChatLogin from "../components/chatElements/ChatLogin";
import { chatContext } from "../chatContext/ChatContext";
import { useContext } from "react";
import ChatLogout from "../components/chatElements/ChatLogout";

export default function Chat() {
  const { username, loggedIn, isLoading } = useContext(chatContext);

  return (
    <div>
      {username && (
        <div className="chat-header-panel">
          <div>
            <span>Your name: </span>
            <span>{username}</span>
            <br />
          </div>
          <ChatLogout />
        </div>
      )}
      {console.log(loggedIn)}
      <p>{loggedIn}</p>

      {loggedIn && (
        <>
          <ChatTabs />
          <div className="chat-subcontainer">
            <ChatDisplay />
            <ChatList />
            <ChatInput />
          </div>
        </>
      )}
      {!loggedIn && (
        <div className="chat-login-container">
          <ChatLogin />
        </div>
      )}
      {isLoading && (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
