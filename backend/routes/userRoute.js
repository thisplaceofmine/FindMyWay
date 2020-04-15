const router = require('express').Router();
const signUserJWT = require('../services/signUserJWT');

const UserModel = require('../models/users');
const verifyToken = require('../middlewares/verifyToken');

router.route('/').post(verifyToken, async (req, res) => {
  try {
    let temp = await UserModel.findOne({ googleId: req.body.googleId });
    temp.name = { ...req.body.name };
    console.log(temp);
    await temp.save();
    const token = signUserJWT(temp);
    res.status(200).json(token);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
