const userModel = require("../database/models/user");

module.exports = (req, res) => {
  userModel
    .create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      const errorMessages = Object?.values(err?.errors)?.map(
        (item) => item?.message
      );
      req.flash("userRegistrationErrors", errorMessages);
      req.flash("data", req.body);
      if (err) {
        res.redirect("/auth/register");
      }
      console.log("USER MODEL ERROR ====", err?.errors);
    });
};
