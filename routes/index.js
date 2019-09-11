const express = require("express");
const router = express.Router();
const user = require("../models/User");
const plantModel = require("../models/Plant");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// POSTING the survey responses
router.get("/survey", (req, res, next) => {
  console.log("current user survey", req.session.currentUser);
  res.render("users/survey");
});

router.post("/survey", (req, res, next) => {
  const currentUser = req.session.currentUser;
  const { outside, lighting, humidity, animals, type_of_plant } = req.body;

  const newUserTest = {
    habitation: {
      outside,
      lighting,
      humidity,
      animals,
      type_of_plant
    }
  };

  if (dbRes.habitation.outisde === "both") {
    dbRes.habitation.outisde === ["indoor", "outside"];
  }

  plantModel
    .find({
      $and: [
        { "environment.outside": req.body.habitation.outside },
        { "environment.lighting": req.body.habitation.lighting },
        { "environment.humidity": req.body.habitation.humidity },
        { "environment.animals": req.body.habitation.animals },
        { "environment.type_of_plant": req.body.habitation.type_of_plant }
      ]
    })
    .then(response => {
      console.log("response", response);
      user
        .findOneAndUpdate(
          { email: req.session.currentUser.email },
          { plant_test: response }
        )
        .then(answer => res.redirect("/profile"))
        .catch(dbErr => console.log("err", dbErr));
    })
    .catch(error => {
      console.log(error);
    })
    .catch(err => console.log(err));
});

/* GET the user profile page */
router.get("/profile", (req, res) => {
  console.log("current user", req.session.currentUser);
  user
    .findOne({ email: req.session.currentUser.email })
    .then(dbRes => {
      res.render("users/user_profile", { user: dbRes });
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
