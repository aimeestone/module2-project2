const express = require("express");
const router = new express.Router();
const infoUser = require("../models/User");
const uploader = require("./../config/cloudinary");

// Changing the user details in the user profile:

function profile(message) {
  infoUser.findOne({ email: req.session.currentUser.email }).then(answer => {
    res.render("user_profile", { user: answer, msg: message }).catch(errors => {
      console.log(errors);
    });
  });
}

router.get("/profile", (req, res) => {
  infoUser
    .findOne({ email: req.session.currentUser.email })
    .then(dbRes => {
      res.render("user_profile", { user: dbRes });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/profile", uploader.single("avatar"), (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const avatar = req.body.avatar;

  const newInfoUser = {
    name,
    email,
    password,
    avatar
  };

  console.log(newInfoUser);

  if (req.file) {
    newInfoUser.avatar = req.file.secure_url;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(newInfoUser.password, salt);
  newInfoUser.password = hashed;

  infoUser
    .find({ email: newInfoUser.email })
    .then(response => {
      if (response && response !== req.session.currentUser.email) {
        profile("This email is already registered, sorry!");
      } else {
        infoUser
          .findOneAndUpdate(
            { email: req.session.currentUser.email },
            newInfoUser
          ) // checker si la nouvelle info ppale existe déjà en BDD
          .then(res => {
            res.redirect("/profile");
          })
          .catch(error => {
            console.log(error);
          });
      }
    })
    .catch();
});

//   })

// .then(dbRes => {
//   if (dbRes) {
//     res.render("users/user_profile", {
//       errorMessage: "This user is already registered, sorry!"
//     });
//     return;
// }
// else {
//   res.redirect("/profile")
//   const salt = bcrypt.genSaltSync(10);
//   const hashed = bcrypt.hashSync(newInfoUser.password, salt);
//   newInfoUser.password = hashed;

//   if (req.file) { newInfoUser.avatar = req.file.secure_url; }

module.exports = router;
