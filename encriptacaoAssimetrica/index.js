const {
  generateKeyPairSync,
  publicEncrypt,
  privateDecrypt,
} = require('crypto');

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,

  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

const encryptedData = publicEncrypt(
  publicKey,
  Buffer.from('secret message')
);

console.log('encrypted data: ', encryptedData.toString('hex'));

// ------------------data transmission -----------------

const decryptedData = privateDecrypt(privateKey, encryptedData);

console.log('decrypted data: ', decryptedData.toString('utf-8'));
