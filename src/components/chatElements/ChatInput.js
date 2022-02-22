import React from "react";
import { useEffect } from "react";
import { useContext, useRef } from "react";
import "../../chat.css";
import { chatContext } from "../../chatContext/ChatContext";
import { encodeAndEncrypt } from "../../utils/encodeAndEncrypt";
import { importPublicKey } from "../../utils/importPublicKey";

export default function ChatInput() {
  const {
    socket,
    activeConversationTab,
    addNewMessageToAllMsgArray,
    username,
    allMessages,
    usersList,
  } = useContext(chatContext);
  const messageInput = useRef();

  //find private key of the buddy you are sending msg to:
  const findActiveBuddyPublicKey = () => {
    const buddy = usersList.find(
      (user) => user.id === activeConversationTab.id
    );
    console.log(buddy);
    return buddy.publicKey;
  };

  return (
    <>
      {activeConversationTab && (
        <div className="chatBorders">
          <textarea ref={messageInput}></textarea>
          <div className="chatInput-btn-container">
            <button
              onClick={() => {
                messageInput.current.value = "";
              }}
            >
              Clear
            </button>
            <button
              onClick={async () => {
                const msgToSend = messageInput.current.value;
                //first get the public key in portable form
                const portablePublicKey = findActiveBuddyPublicKey();
                //then import to to be able to use it:
                const importedPublicKey = await importPublicKey(
                  portablePublicKey
                );
                //then encrypt the msg with imported publicKey
                const encryptedSmgToSend = await encodeAndEncrypt(
                  msgToSend,
                  importedPublicKey
                );
                //then send it:
                socket.emit("message", {
                  to: activeConversationTab.id,
                  from: socket.id,
                  fromUsername: username,
                  message: encryptedSmgToSend,
                });
                //and add message to local archive
                addNewMessageToAllMsgArray(
                  activeConversationTab.id,
                  username,
                  msgToSend
                );
                console.log("sending message");
                messageInput.current.value = "";
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
