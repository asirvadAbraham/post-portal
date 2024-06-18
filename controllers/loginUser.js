const userModel = require("../database/models/user");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
  const { email, password } = req.body;
  userModel
    .findOne({ email })
    .then((user) => {
      if (user) {
         console.log("USER FOUND WITH GIVEN EMAIL");
        bcrypt
          .compare(password, user?.password)
          .then((passwordMatched) => {
            console.log("Matched", passwordMatched);
            if (passwordMatched) {
                req.session.userId=user._id
              res.redirect("/");
            } else {
              res.redirect("/auth/login");
            }
          })
          .catch((error) => {
            console.log("BCRYPT.COMPARE", error);
          });
      } else {
            console.log("NO USER FOUND WITH GIVEN EMAIL");
        res.redirect("/auth/login");
      }
    })
    .catch((error) => {
      console.log("Find error", error);
    });

};
