const passport = require('passport');
const router = require('express').Router();
const signUserJWT = require('../services/signUserJWT');

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

router.route('/current_user').get(async (req, res) => {
  try {
    if (req.user === undefined) {
      const token = signUserJWT({});
      res.status(200).json({ data: false, token });
    } else {
      const token = signUserJWT(req.user.googleid);
      res.status(200).json({ data: req.user, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Error ' + err);
  }
});


module.exports = router;
