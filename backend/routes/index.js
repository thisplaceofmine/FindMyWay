const frontpage = require('./frontpage');
const googleAuthRouter = require('./googleAuthRoutes');
const mapRouter = require('./mapRouter');

module.exports = app => {
  app.use('/mock', frontpage);
  app.use('/auth/google', googleAuthRouter);
  app.use('/map', mapRouter);
};
