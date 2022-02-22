import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import "../../chat.css";
import { chatContext } from "../../chatContext/ChatContext";

export default function ChatList() {
  const {
    socket,
    setConversationTabs,
    setUsersList,
    usersList,
    conversationTabs,
    activeConversationTab,
    setActiveConversationTab,
    initializeNewMessageArray,
  } = useContext(chatContext);
  useEffect(() => {
    socket.on("users-list-updated", (data) => {
      setUsersList(data);
    });
  }, []);

  //add new conversation to opened tabs and make it active or do nothing if already opened
  const openNewConversationTab = (user) => {
    const tabIsAlreadyOpened = conversationTabs.find((tab) => tab === user);
    if (tabIsAlreadyOpened) {
      setActiveConversationTab(user);
      return;
    }

    setConversationTabs((previousTabs) => {
      //only add new tab if not opened already!
      const alreadyOpened = conversationTabs.find((tab) => tab.id === user.id);
      if (alreadyOpened) {
        return previousTabs;
      }
      //not yet opened
      return [...previousTabs, user];
    });
    setActiveConversationTab(user);
    //initialize empty msg array for this conversation
    initializeNewMessageArray(user.id);
  };
  console.log(usersList);
  return (
    <div className="chatBorders chatList-container">
      <div>Available buddies</div>
      {usersList.map((user) => {
        //render all users on list except yourself
        if (user.id === socket.id) return null;

        return (
          <button
            onClick={() => {
              openNewConversationTab(user); //pass in entire user object
            }}
            key={user.id}
          >
            {user.username}
          </button>
        );
      })}
    </div>
  );
}
