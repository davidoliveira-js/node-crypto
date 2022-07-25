const crypto = require('crypto');

const secret = '86638972f323329d61930b60be5f301e';

const encrypt = async (data) => {
  let iv = crypto.randomBytes(16);
  let cipher = await crypto.createCipheriv(
    'aes-256-ctr',
    secret.toString(),
    iv
  );
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = async (data) => {
  let textParts = data.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv(
    'aes-256-ctr',
    secret.toString(),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

const main = async () => {
  const data = 'Somepassword!123';
  const encriptedPassword = await encrypt(data);
  console.log('encrypted password: ', encriptedPassword);
  const decriptedPassword = await decrypt(encriptedPassword);
  console.log('decrypted password ', decriptedPassword);
};

main();
