//message is first deciphered, then the resulting encoded string must be decoded in order to see the original message
export const decryptAndDecode = async (cipheredMsg, privateKey) => {
  console.log("#######################");
  console.log("RECEIVED ENCRYPTED MSG:");
  console.log(cipheredMsg);
  const decryptedMessage = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    cipheredMsg
  );
  console.log("DECIPHERED ENCRYPTED MSG:");
  console.log(decryptedMessage);
  //text after decryption is still encoded - needs decoding:
  const dec = new TextDecoder();
  const decodedMessage = dec.decode(decryptedMessage);
  console.log("DECODED DECIPHERED MSG:");
  console.log(decodedMessage);
  console.log("#######################");

  return decodedMessage;
};
