const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("./../models/User");
const cloudinary = require("./../config/cloudinary");

router.get("/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/signup", cloudinary.single("avatar"), (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then(dbRes => {
      if (dbRes) {
        res.render("users/signup", {
          msg: "An account already exists with this email"
        });
        return;
      } else {
        const { name, email, password } = req.body;
        const newUser = {
          name,
          email,
          password
        };
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hashed;

        newUser.avatar = req.file.secure_url;

        UserModel.create(newUser)
          .then(response => res.redirect("/survey"))
          .catch(error => console.log(error));
      }
    })
    .catch(dberr => console.log(dberr));
});

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post("/login", (req, res) => {
  const user = req.body;
  UserModel.findOne({ email: user.email })
    .then(dbRes => {
      if (!dbRes) {
        res.render("users/login", { msg: "Incorrect email or password" });
        return;
      } else {
        if (bcrypt.compareSync(user.password, dbRes.password)) {
          req.session.currentUser = user;
          res.redirect(`/profil/${dbRes._id}`);
        } else {
          res.render("users/login", { msg: "Incorrect email or password" });
          return;
        }
      }
    })
    .catch(dberr => console.log(dberr));
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    res.locals.loggedin = "false";
    res.redirect("/");
  });
});

module.exports = router;
