import crypto from "crypto";

// export const key = crypto.randomBytes(32);
export const iv = crypto.randomBytes(16);

export async function encrypt(data: string) {
  const initVector = crypto.randomBytes(16);
  const key = crypto.randomBytes(32);

  const cipher = crypto.createCipheriv("aes-256-cbc", key, initVector);

  // 4. Encrypt the data
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  // 5. Return the encrypted data and the IV (both encoded as hex strings)
  return {
    encryptedData: encrypted,
    initVector: initVector.toString("hex"),
    key: key.toString('hex')
  };
}

export function decrypt(encryptedText: string, init : string, keyHex : string) {
   const initVector = Buffer.from(init, 'hex');

    // 2. Convert the key from hex string to Buffer
    const mykey = Buffer.from(keyHex, 'hex');

    // 3. Create a decipher object
    const decipher = crypto.createDecipheriv('aes-256-cbc', mykey, initVector);

    // 4. Decrypt the data
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    // 5. Return the decrypted data
    return decrypted;
}
