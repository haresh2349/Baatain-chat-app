import CryptoJS from "crypto-js";
export const handleCheckUniquenessOfEmail = () => {
    
}

// export const encryptString = (textToEncrypt:string) => {
//   const secretKey = process.env.REACT_APP_ENCRYPT_PASSWORD_SECRET_KEY as string; // Replace with a secure method to obtain a key
//   console.log(secretKey,"secretKey",process.env)
//   const paddedKey = CryptoJS.enc.Utf8.parse(secretKey.padEnd(32, "0")); // Ensure key length is 32 bytes (256 bits)
//   const iv = CryptoJS.lib.WordArray.random(16); // Generate a random 16-byte IV

//   // Encrypt the text using AES-256-CBC
//   const encrypted = CryptoJS.AES.encrypt(textToEncrypt, paddedKey, { iv });

//   // Concatenate IV and ciphertext
//   const encryptedText = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);

//   return encryptedText;
// };

// export const decryptToken = (encryptedText:string) => {
//     const secretKey = process.env.ENCRYPT_PASSWORD_SECRET_KEY as string;
//   const paddedKey = secretKey.padEnd(32, "0"); // Ensure key length is 32 bytes (256 bits)
//   const iv = CryptoJS.lib.WordArray.random(32);
//   const decryptedText = CryptoJS.AES.decrypt(encryptedText, paddedKey, {
//     iv: CryptoJS.enc.Hex.parse(iv),
//     mode: CryptoJS.mode.CBC
//   }).toString(CryptoJS.enc.Utf8);
//   return decryptedText;
// };