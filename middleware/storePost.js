module.exports = (req, res, next) => {
  const img = req?.files?.image;
  const reqBody = req.body;
  console.log("IMG==", img);
  if (
    !img ||
    !reqBody.title ||
    !reqBody.content ||
    !reqBody.subtitle
  ) {
    console.log("FAILEDDDDDDD");

    return res.redirect("/posts/new");
  }
  next();
};
