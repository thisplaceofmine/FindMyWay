const frontpage = require("./frontpage")
const googleAuthRouter = require("./googleAuthRoutes");

module.exports = app => {
  app.use("/", frontpage);
  app.use('/auth/google', googleAuthRouter)
};

