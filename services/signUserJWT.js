const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const signOption = {
    expiresIn: '1d',
    issuer: 'This place of mine',
    subject: 'https://github.com/thisplaceofmine/FindMyWay',
  };
  
  return jwt.sign({ user }, process.env.jwtSecretKey, signOption);
};
