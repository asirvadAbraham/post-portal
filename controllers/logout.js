module.exports = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("LOG OUT ERROR", err);
    }
    console.log("LOGGED OUT");
    res.redirect("/");
  });
};
