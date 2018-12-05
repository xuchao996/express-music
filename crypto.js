
const crypto = require("crypto");

const hash = crypto.createHash("md5");

hash.update("hello world");
console.log(hash.digest('hex'));

hash.update("hello nodejs");

console.log(hash.digest('hex'));
