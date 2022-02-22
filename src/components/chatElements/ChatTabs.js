import React from "react";
import { useContext } from "react";
import "../../chat.css";
import { chatContext } from "../../chatContext/ChatContext";

export default function ChatTabs() {
  const {
    conversationTabs,
    setConversationTabs,
    activeConversationTab,
    setActiveConversationTab,
  } = useContext(chatContext);

  const closeCurrentConversation = (currentTab) => {
    //must be nested like this or des not work...
    setConversationTabs((prevTabs) => {
      setActiveConversationTab((prev) => {
        return conversationTabs.find((tab) => tab.id !== currentTab.id);
      });
      console.log("closing tab", currentTab.id);
      return prevTabs.filter((tab) => tab.id !== currentTab.id);
    });
    console.log(conversationTabs);
    console.log(activeConversationTab);
  };

  //add special styling to the active tab
  const makeClickedTabTheActiveOne = (tab) => {
    setActiveConversationTab(tab);
  };

  return (
    <div className="chatTabs-container chatBorders">
      {conversationTabs.map((tab) => (
        <div
          key={tab.id}
          className={`${
            //apply conditionally the active class
            tab.id === activeConversationTab.id ? "chatTabs-active-tab" : ""
          } chatTabs-single-tab chatBorders chatTabs-fresh-msg`}
          onClick={() => {
            makeClickedTabTheActiveOne(tab);
          }}
        >
          <span>{tab.username}</span>
          <button
            onClick={() => {
              closeCurrentConversation(tab);
            }}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}
