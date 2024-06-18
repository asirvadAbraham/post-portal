const express = require("express");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const mongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");
const cloudinary = require("cloudinary");
require("dotenv").config();

// const edge = () =>
//   import("edge.js")
//     .then(({ default: edge }) => edge.global())
//     .catch((e) => {
//       console.log("Edge js error", e);
//     });

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");

const app = express();
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);

app.use(connectFlash());
cloudinary.config({
  api_key: process.env.COUDINARY_API_KEY,
  api_secret: process.env.COUDINARY_API_SECRET,
  cloud_name: process.env.COUDINARY_CLOUD_NAME,
});
app.use(
  expressSession({
    secret: 'secret',
    store: mongoStore.create({ mongoUrl: dbUrl }),
  })
);
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);
app.use("*", async (req, res, next) => {
  app.locals.auth = req.session.userId; 
  next();
  // console.log("SSSSSSSSSSSSSSSSSSSSSSSS", req.session);
  // edge("auth", req.session.userId)
  //   .then(() => {
  //     console.log("Auth rrrrrrrrrrrrr");
  //   })
  //   .catch((e) => {
  //     console.log("Auth errrrrrrrrrrrrrrrr", e);
  //   });

  // import("edge.js")
  //   .then(({ default: edge }) => {
  //     console.log("NAME SET");
  //     edge.global("name", "Test");
  //   })
  //   .catch((error) => {
  //     // Handle error if the module cannot be imported
  //     console.error("Error importing edge.js:", error);
  //   });
  // next();

  // try {
  //   await import("edge.js").then(({ default: edge }) => {
  //     edge.global("name", "Test");
  //         console.log("NAME SET", edge.global("name"));
  //   });
  //   next();
  // } catch (error) {
  //   console.error("Error setting global variable:", error);
  //   next(error);
  // }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

const validateCreatePostMiddleWare = require("./middleware/storePost");
const authMiddleWare = require("./middleware/auth");
const redirectIfAuthenticatedMiddleWare = require("./middleware/redirectIfAuthenticated");

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleWare, createPostController);
app.get("/auth/logout", authMiddleWare, logoutController);
app.post(
  "/posts/store",
  authMiddleWare,
  validateCreatePostMiddleWare,
  storePostController
);
app.get(
  "/auth/register",
  redirectIfAuthenticatedMiddleWare,
  createUserController
);
app.post(
  "/users/register",
  redirectIfAuthenticatedMiddleWare,
  storeUserController
);
app.get("/auth/login", redirectIfAuthenticatedMiddleWare, loginController);
app.post(
  "/users/login",
  redirectIfAuthenticatedMiddleWare,
  loginUserController
);
app.use((req, res) => {
  res.render("not-found");
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
