const Post = require("../database/models/post");
const path = require("path");
const cloudinary = require("cloudinary");

module.exports = (req, res) => {
  console.log("Request==", req.body);
  console.log("FILE==", req.files);

  const { image } = req.files;
  const uploadPath = path.resolve(__dirname, "../public/posts", image.name);

  image
    .mv(uploadPath)
    .then(() => {
      cloudinary.v2.uploader
        .upload(uploadPath)
        .then((res) => {
          console.log("cloudinary upload done", res);

          Post.create({
            ...req.body,
            desc: req.body.description,
            userName: req.body.username,
            image: `${res.secure_url}`,
            authorInfo: req.session.userId,
          })
            .then((post) => {
              res.redirect("/");
              console.log("Creating Post==", post);
            })
            .catch((err) => {
              console.log("Create Error=", err);
            });
        })
        .catch((err) => {
          console.log("cloudinary upload error", err);
          res.redirect("/");
        });
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
