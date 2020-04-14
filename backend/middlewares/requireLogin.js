module.exports = (req, res, next) => {
  console.log(req.user)
    if (!req.user) {
       res.status(401).json({ Error: 'You mush login' });
    }
    return next();
  };
  