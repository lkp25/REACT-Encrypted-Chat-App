//derive the public key of type Crypto Key from transportable(portable) form:
export const importPublicKey = async (portablePublicKey) => {
  const realPublicKey = await window.crypto.subtle.importKey(
    "jwk",
    portablePublicKey,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    true,
    ["encrypt"]
  );
  return realPublicKey;
};
