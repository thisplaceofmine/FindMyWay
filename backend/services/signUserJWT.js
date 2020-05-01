const jwt = require('jsonwebtoken');

module.exports = (user) => {
  const signOption = {
    expiresIn: '1d',
    issuer: 'This place of mine',
    subject: 'https://github.com/thisplaceofmine/FindMyWay',
  };
  let userData = user ;
  userData.pinlist === undefined ? {} : (userData.pinlist = []);
  console.log(userData)
  return jwt.sign({ userData }, process.env.jwtSecretKey, signOption);
};
