const passport = require('passport');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

router
  .route('/')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/callback').get(passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

router.route('/logout').get((req, res) => {
  try {
    req.logout();
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(400).json('Error ' + err);
  }
});

router.route('/current_user').get((req, res) => {
  const signOption = {
    expiresIn: '1d',
    issuer: 'This place of mine',
    subject: 'https://github.com/thisplaceofmine/FindMyWay',
    audience: 'http://localhost:5000/',
  };
  const token = jwt.sign(
    { user: req.user },
    process.env.jwtSecretKey,
    signOption
  );
  try {
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json('Error ' + err);
  }
});

module.exports = router;
