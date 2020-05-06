const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const jwt = require('jsonwebtoken')
require('dotenv').config();

require('./models/users');
require('./services/passport');

const app = express();

app.use(
  cookieSession({
    maxAge: 1000 * 60 * 60 * 24,
    keys: [
      process.env.cookieKey_1,
      process.env.cookieKey_2,
      process.env.cookieKey_3,
      process.env.cookieKey_4,
      process.env.cookieKey_5
    ]
  })
);

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(error => console.log(error));

// mongodb connection check

app.use(passport.initialize());
app.use(passport.session());

require('./routes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
  });
}


jwt.sign(
  { foo: 'bar' },
  process.env.jwtSecretKey,
  {
    algorithm: 'RS256',
  },
  (err, token) => {console.log(token)}
);


const port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('app listening on port ' + port);
});
