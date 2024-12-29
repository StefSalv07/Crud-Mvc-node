require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const bodyparser = require("body-parser");
const ejs = require("ejs");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

const PORT = process.env.PORT;
app.use(express.json());
app.use(bodyparser.json());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
app.use(express.static("public"));
app.use(express({ urlencoded: true }));
app.get("/", (req, res) => {
  // res.send("Hello World");
  res.render("index", {
    title: "Home Page",
    data: "Hello World",
    message: "Welcome to the Home Page",
  });
});

//routes
app.use("", require("./routes/userRoutes"));
//connecting to db
mongoose
  .connect(process.env.MONGO_URI)
  .then((data) => {
    console.log("Connected to db");
    mongoose.set("debug", true);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
