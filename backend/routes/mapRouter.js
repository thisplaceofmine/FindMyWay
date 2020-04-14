const router = require('express').Router();


const UserModel = require('../models/users');
const verifyToken = require('../middlewares/verifyToken');


router.route('/').get(async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(err);
    res.status(500).json('Error: ' + err);
  }
});

router.route('/').post(verifyToken, async (req, res) => {
  try {
    console.log('Trigger');
    let reqDataList = [];
    let temp = await UserModel.findOne({ googleid: req.locals.user.googleid });

    for (var key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        item = req.body[key];
        reqDataList.push({
          type: item.type,
          geometry: { coordinates: item.geometry.coordinates },
          properties: {
            Dataset: item.properties.Dataset,
            'Facility Name': item.properties['Facility Name'],
            Address: item.properties.Address,
            設施名稱: item.properties['設施名稱'],
            地址: item.properties['地址'],
            Telephone: item.properties.Telephone,
            聯絡電話: item.properties['聯絡電話'],
            'Email Address': item.properties['Email Address'],
            電郵地址: item.properties['電郵地址'],
            Website: item.properties['Website'],
            網頁: item.properties['網頁'],
          },
        });
      }
    }

    temp.pinlist = reqDataList;
    await temp.save();
    console.log(temp)
    res.status(200).json(temp)
  } catch (err) {
    console.log('Trigger 2');
    console.log(err);
    res.status(500).json('Error: ' + err);
  }
});

module.exports = router;
