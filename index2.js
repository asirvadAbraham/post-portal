const express = require("express");
const expressEdge = require("express-edge");

const homePageController = require("./controllers/homePage");

const app = express();

app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);
app.use("*", async (req, res, next) => {
  import("edge.js")
    .then(({ default: edge }) => {
      console.log("Value set to name");
      edge.global("name", "TEST");
    })
    .catch((error) => {
      console.error("Error importing edge.js:", error);
    });
  next();
});

app.get("/", homePageController);

app.listen(4000, () => {
  console.log("App listening on port 4000");
});
