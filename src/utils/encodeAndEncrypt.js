//message is first encoded, only then can be encrypted.
export const encodeAndEncrypt = async (plainTextMsg, publicKey) => {
  // encrypt message:
  // let encryptedMessage
  const enc = new TextEncoder();
  const encodedMessage = enc.encode(plainTextMsg);

  const encryptedMessage = await window.crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    encodedMessage
  );

  console.log(encryptedMessage.toString());
  console.log(encryptedMessage);

  return encryptedMessage;
};
