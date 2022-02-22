import React, { useContext } from "react";
import { useRef } from "react";
import { chatContext } from "../../chatContext/ChatContext";

export default function ChatLogin() {
  const { setLoggedIn, setIsLoading, setUsername, socket, publicKey } =
    useContext(chatContext);
  const usernameInput = useRef(null);

  //login function
  const loginToChat = () => {
    const username = usernameInput.current.value;
    setIsLoading(true);

    //simulate server latency
    setTimeout(() => {
      setIsLoading(false);
      setLoggedIn(true);
      setUsername(username);
      socket.emit("user-login", {
        id: socket.id,
        username: username,
        publicKey: publicKey,
      });
    }, 1000);
  };

  return (
    <div>
      <p>please enter your nickname:</p>
      <input ref={usernameInput} type="text" />
      <button
        onClick={() => {
          loginToChat();
        }}
      >
        Enter Chat
      </button>
    </div>
  );
}
