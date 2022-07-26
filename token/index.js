const jwt = require('jsonwebtoken');

const secretKey = 'SuperSecretKey!';

const token = jwt.sign(
  {
    name: 'john',
    age: 20,
  },
  secretKey
);

console.log('token: ', token);

const decodeToken = jwt.verify(token, secretKey);

console.log(decodeToken);
