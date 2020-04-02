const router = require('express').Router();
const usersModel = require('../models/users');

router.route('/').get(async (req, res) => {
  try {
    // let temp = await usersModel.find({});
    res.status(200).json({ Hello: 'World' });
  } catch (err) {
    console.log(err);
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
