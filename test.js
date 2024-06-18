const mongoose = require("mongoose");

const Post = require("./database/models/post");

mongoose.connect("mongodb://0.0.0.0:/node-js-test-blog");

// Adding data

Post.create({
  title: "Third Title",
  desc: "Third Desc",
  content: "Third Content",
})
  .then((post) => {
    console.log("Creating Post==", post);
  })
  .catch((err) => {
    console.log("Create Error=", err);
  });

// Getting data

// Post.find({ title: "First Title" })
// .then((post) => {
//   console.log("Post==", post);
// })
// .catch((err) => {
//   console.log("Error=", err);
// });

// Post.findById("666194a0e50c07ac790e6b4e")
//   .then((post) => {
//     console.log("Get by id data==", post);
//   })
//   .catch((err) => {
//     console.log("Get by id Error=", err);
//   });

// Updating data

Post.findByIdAndUpdate("666194a0e50c07ac790e6b4e", {
  title: "Second Title updated",
})
  .then((post) => {
    console.log("Update by id data==", post);
  })
  .catch((err) => {
    console.log("Update by id Error=", err);
  });;
