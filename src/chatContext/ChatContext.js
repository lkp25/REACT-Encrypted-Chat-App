import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { decryptAndDecode } from "../utils/decryptAndDecode";

//initialize the context with null value
const chatContext = React.createContext(null);

const ChatContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [socket, setSocket] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [conversationTabs, setConversationTabs] = useState([]);
  const [activeConversationTab, setActiveConversationTab] = useState(null);
  //object ,each key is socketID- each value is an array of messages, each message is an object with sender + content props
  const [allMessages, setAllMessages] = useState({
    dummy: [{ message: "start new message", sender: "server" }],
  });

  const initializeNewMessageArray = useCallback((conversationID) => {
    setAllMessages((prevState) => {
      const newState = Object.assign({}, prevState);
      //initialize empty array for future messages -only if not yet initialized
      if (!prevState[conversationID]) {
        newState[conversationID] = [];
      }
      return newState;
    });
  }, []);

  //helper function for complex allMessages array state update management:
  const addNewMessageToAllMsgArray = (conversationID, sender, message) => {
    const newMessage = {
      sender: sender,
      message: message,
    };
    //initialize empty array if user is a receiver of first message in history:
    initializeNewMessageArray(conversationID);
    setAllMessages((prevState) => {
      //fight memory leak - dont render doubled msgs! set default value to { message: null } also to prevent
      //null error if this is the first message in history.
      const lastMsg = prevState[conversationID][
        prevState[conversationID].length - 1
      ] || { message: null };
      if (lastMsg.message === newMessage.message) {
        return prevState;
      }
      //brand new message - update state
      const newState = Object.assign({}, prevState);

      newState[conversationID] = [...newState[conversationID], newMessage];

      return newState;
    });
    console.log(allMessages);
  };

  console.log("CHAT CONTEXT RERENDER");

  //generate KeyPair:
  useEffect(() => {
    crypto.subtle
      .generateKey(
        {
          name: "RSA-OAEP",
          // Consider using a 4096-bit key for systems that require long-term security
          modulusLength: 4096,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      )
      .then((keyPair) => {
        setPrivateKey(keyPair.privateKey);
        console.log(privateKey);
        setTimeout(() => {
          console.log(privateKey);
        }, 3000);
        //public key needs to be exported to JSON WEB KEY format in order to send it to server:
        crypto.subtle
          .exportKey("jwk", keyPair.publicKey)
          .then((publicKeyInJWKFormat) => {
            setPublicKey(publicKeyInJWKFormat);
          });
      });
  }, []);

  //initialize WebSocket connection:
  useEffect(() => {
    const socket = io("http://localhost:9999");

    socket.on("connect", () => {
      console.log(`connected with ID ${socket.id}`);
      setSocket(socket);
      //listen to upcoming messages(needs to be async!!!):
      socket.on("message", async (data) => {
        //initialize msg array first to prevent render error from chatDisplay component
        initializeNewMessageArray(data.from);
        //display new tab if conversation just started:
        setConversationTabs((prevTabs) => {
          //but dont display if already opened:
          const alreadyOpened = prevTabs.find((tab) => tab.id === data.from);
          if (alreadyOpened) {
            return prevTabs;
          }
          //not yet opened - also make it the active one
          setActiveConversationTab({
            id: data.from,
            username: data.fromUsername,
          });
          return [...prevTabs, { id: data.from, username: data.fromUsername }];
        });
        console.log(data);
        //message is encrypted - decrypt it and decode so that it can be displayed in readable form:
        const decryptedMessage = await decryptAndDecode(
          data.message,
          privateKey
        );
        //here the conversationID(first argument) must be set to data.from!!! this is for the reveiver!!
        addNewMessageToAllMsgArray(
          data.from,
          data.fromUsername,
          decryptedMessage
        );
      });
    });
    //private key is absolutely necessary as a dependency here - it will be null on first render of ChatContext
    //and only set to a value after first useEffect hook executes 'setPrivateKey(keyPair.privateKey)'
    //also, it will never change in the future so it will not cause any more rerenders.
  }, [privateKey]);

  //function for closing the websocket connection:
  const closeWSConnection = () => {};
  return (
    // the Provider gives access to the context to its children
    <chatContext.Provider
      value={{
        socket,
        loggedIn,
        setLoggedIn,
        isLoading,
        setIsLoading,
        username,
        setUsername,
        publicKey,
        privateKey,
        setConversationTabs,
        conversationTabs,
        setUsersList,
        usersList,
        activeConversationTab,
        setActiveConversationTab,
        addNewMessageToAllMsgArray,
        initializeNewMessageArray,
        allMessages,
      }}
    >
      {children}
    </chatContext.Provider>
  );
};

export { chatContext, ChatContextProvider };
