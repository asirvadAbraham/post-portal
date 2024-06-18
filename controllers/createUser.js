module.exports = (req, res) => {
  console.log("SESSION INFO", req.session);
  const userRegistrationErrors = req.flash("userRegistrationErrors");
  const data = req.flash("data")?.[0];

  res.render("register", { userRegistrationErrors, data });
};