const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema(
  {
    googleid: { type: String, unique: true, trim: true },
    email: { type: String },
    name: {
      familyName: { type: String, trim: true },
      givenName: { type: String, trim: true },
    },
    profilePic: { type: String, trim: true },
    pinlist: [
      {
        type: { type: String, trim: true },
        geometry: { coordinates: [Number] },
        properties: {
          Dataset: { type: String, trim: true },
          'Facility Name': { type: String, trim: true },
          Address: { type: String, trim: true },
          設施名稱: { type: String, trim: true },
          地址: { type: String, trim: true },
          Telephone: { type: String, trim: true },
          聯絡電話: { type: String, trim: true },
          'Email Address': { type: String, trim: true },
          電郵地址: { type: String, trim: true },
          Website: { type: String, trim: true },
          網頁: { type: String, trim: true },
        },
      },
    ],
    status: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', users);
