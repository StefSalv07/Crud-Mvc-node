const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");

// Add a new user
router.post("/saveuser", (req, res, next) => {
  console.log(req.body, "req.body");
  console.log("save user called");

  userModel
    .findOne({
      email: req.body.email,
    })
    .then((existingUser) => {
      if (!existingUser) {
        const user = new userModel(req.body);
        user
          .save()
          .then((data) => {
            res.json({
              message: "User added successfully",
              status: 200,
              data: data,
            });
            req.session.message = {
              type: "success",
              message: "User added successfully",
            };
            res.redirect("/");
          })
          .catch((err) => {
            res.json({
              message: err.message,
              type: "danger",
              status: 500,
              data: err,
            });
          });
      } else {
        res.json({
          message: "User already exists with this id",
          status: 400,
          data: existingUser.id,
        });
      }
    });
});
// Get all users

router.get("/users", (req, res) => {
  res.send("All Users found");
});
router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/contact", (req, res) => {
  res.render("contactus");
});

router.get("/addUser", (req, res) => {
  res.render("addUser");
});
module.exports = router;
