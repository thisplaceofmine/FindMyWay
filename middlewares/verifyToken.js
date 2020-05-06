const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // console.log('Trigger Token Middleware');
  // console.log(req.headers)
  // Is there even a token
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    // Is the token valid
    jwt.verify(req.token, process.env.jwtSecretKey, (err, decoded) => {
      if (err) {
        req.session = null;
        res.status(403).json({ Error: 'Token was not valid' }).end();
      } else {
        console.log(decoded);
        req.locals = decoded;
      }
    });
    next()
  } else {
    // Token was not found
    req.session = null;
    res.status(401).json({ Error: 'Token was not found' }).end();
  }
};
