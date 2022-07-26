const {
  generateKeyPairSync,
  createSign,
  createVerify,
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

let data = 'string to be signed';

// assinatura

const signer = createSign('rsa-sha256');

signer.update(data);

const sign = signer.sign(privateKey, 'hex');

console.log('sign: ', sign);

//intermediário malicioso

data += '123';

// envio do documento  ---> documento, assinatura e chave pública

const verifier = createVerify('rsa-sha256');

verifier.update(data);

const isVerified = verifier.verify(publicKey, sign, 'hex');

console.log(isVerified);
