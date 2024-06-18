const userModel = require("../database/models/user");
module.exports = (req, res, next) => {
  userModel
    .findById(req.session.userId)
    .then((user) => {
      console.log("Auth User==", user);
      if (!user) {
        return res.redirect("/");
      }
      next();
    })
    .catch((error) => {
      console.log("Auth Error==", error);
      res.redirect("/");
    });
};
