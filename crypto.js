const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = crypto.scryptSync("mi_clave_secreta", "salt", 32);
const iv = Buffer.alloc(16, 0);

function encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return Buffer.concat([
        cipher.update(text, "utf8"),
        cipher.final(),
    ]).toString("hex");
}

function decrypt(encrypted) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    return Buffer.concat([
        decipher.update(Buffer.from(encrypted, "hex")),
        decipher.final(),
    ]).toString("utf8");
}

module.exports = { encrypt, decrypt };
