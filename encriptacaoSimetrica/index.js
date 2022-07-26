const {
  createCipheriv,
  randomBytes,
  createDecipheriv,
} = require('crypto');

const message = 'super secrete message!';
const key = randomBytes(32);
const iv = randomBytes(16);

const cipher = createCipheriv('aes256', key, iv);
const cipherMessage =
  cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

console.log('cipher message: ', cipherMessage);

const decipher = createDecipheriv('aes256', key, iv);
const decipherMessage =
  decipher.update(cipherMessage, 'hex', 'utf-8') +
  decipher.final('utf-8');

console.log('decipher message: ', decipherMessage.toString('utf-8'));
