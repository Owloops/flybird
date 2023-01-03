import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { ext } from "../config/ext";
const iv = randomBytes(16);
const algorithm = "aes-256-ctr";

export const encrypt = (text: string) => {
  const cipher = createCipheriv(algorithm, ext.secretkey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

export const decrypt = (hash: any) => {
  const decipher = createDecipheriv(
    algorithm,
    ext.secretkey,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);

  return decrpyted.toString();
};
