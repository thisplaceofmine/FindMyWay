const router = require('express').Router();
// const jwt = require('jsonwebtoken');
// const usersModel = require('../models/users');

// const verifyToken = (req, res, next) => {
//   console.log("Trigger")
//   const bearerHeader = req.headers['authorization'];
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     // Forbidden
//     res.sendStatus(403);
//   }
// };

router.route('/').get(async (req, res) => {
  try {
    res.status(200).json({ Hello: 'World' });
    // jwt.sign({ foo: 'bar' }, 'secretKey', (err, token) => {
    //   console.log(token);
    //   console.log(err);
    // });
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});


// router.route('/posts').post(verifyToken, async (req, res) => {
//   console.log("Trigger 2")
//   jwt.verify(req.token, process.env.jwtSecretKey , (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({ message: 'Post Create', authData });
//     }
//   });
// });

// router.route('/login').post((req, res) => {
//   console.log('Trigger');
//   const user = { id: 1, username: 'Test', email: 'test@gmail.com' };

//   jwt.sign({ user: user }, process.env.jwtSecretKey ,{expiresIn: "30s"},  (err, token) => {
//     console.log(token);
//     console.log(err);
//     res.json({ token });
//   });
// });

module.exports = router;
