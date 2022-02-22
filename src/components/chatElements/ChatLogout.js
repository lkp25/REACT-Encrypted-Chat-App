import React, { useContext } from "react";
import { chatContext } from "../../chatContext/ChatContext";

export default function ChatLogout() {
  const { setLoggedIn, setIsLoading, setUsername, closeWSConnection } =
    useContext(chatContext);

  const logoutFromChat = () => {
    setIsLoading(true);
    //mock logging in
    setTimeout(() => {
      setIsLoading(false);
      setLoggedIn(false);
      setUsername(null);
      closeWSConnection();
    }, 1000);
  };
  return (
    <div>
      <button
        onClick={() => {
          logoutFromChat();
        }}
      >
        Leave Chat
      </button>
    </div>
  );
}
