const express = require("express");
const router = express.Router();
const user = require("../models/User");
const plantModel = require("../models/Plant");
const gardenCenter = require("../models/Gardencenter");

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

// router.get("/profile", (req, res) => {
//   user
//     .findOne({ email: req.session.currentUser.email })
//     .then(dbRes => {
//       console.log("ici", dbRes);
//       res.render("users/user_profile", { user: dbRes });
//     })
//     // .then(dbRes => {
//     //   res.render("plants/all_plants", { plants: dbRes });
//     // })
//     .catch(error => {
//       console.log(error);
//     });
// });

/* GET the page showing ONE plant */
router.get("/plants/:id", (req, res, next) => {
  plantModel
    .findById(req.params.id)
    .then(dbRes => {
      res.render("plants/one_plant", { plant: dbRes });
    })
    .catch(error => {
      console.log(error);
    });
});
//   user
//     .findOne({ email: req.session.currentUser.email })
//     .then(dbRes => {
//       console.log("ici", dbRes);
//       res.render("users/user_profile", { user: dbRes });
//     })
//     // .then(dbRes => {
//     //   res.render("plants/all_plants", { plants: dbRes });
//     // })
//     .catch(error => {
//       console.log(error);
// });

router.get("/map", (req, res) => {
  res.render("users/map");
});

router.get("/map/api", (req, res) => {
  gardenCenter
    .find()
    .then(dbRes => res.send(dbRes))
    .catch(err => console.log(err));
});

module.exports = router;
