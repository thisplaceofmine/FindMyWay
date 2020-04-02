const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema(
  {
    googleid: { type: String, unique: true, trim: true },
    name: {
      familyName: { type: String, trim: true },
      givenName: { type: String, trim: true }
    },
    profilePic: { type: String, trim: true },
    pinlist: [
      {
        productid: { type: String, sparse: true },
        name: { type: String, trim: true },
        price: { type: Number, default: 0 },
        type: { type: String, trim: true },
        number: { type: Number }
      }
    ],
    status: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', users);
