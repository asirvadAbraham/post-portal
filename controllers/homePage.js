const Post = require("../database/models/post");

module.exports = async (req, res) => {
  const postData = await Post.find({}).populate("authorInfo");
  console.log("SESSION", req.session, "postData", postData);
  res.render("index", { postData });
};
