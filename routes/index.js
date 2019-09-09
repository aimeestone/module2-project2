const express = require("express");
const router = express.Router();
const user = require("../models/User");
const plantModel = require("../models/Plant");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// POSTING the survey responses
router.get("/survey/:id", (req, res, next) => {
  user
    .getOne(req.params.id)
    .then(dbRes => {
      res.render("users/survey", { user: dbRes });
    })
    .catch(error => {
      console.log(error);
      return next(dbErr);
    });
});

router.post("/survey/:id", (req, res, next) => {
  const { outside, lighting, humidity, animals, type_of_plants } = req.body;

  const newUserTest = {
    outside,
    lighting,
    humidity,
    animals,
    type_of_plants
  };

  if (req.body === "both") {
    req.body === {};
  }

  if (!outside || !lighting || !humidity || !animals || !type_of_plants) {
    res.render("survey", {
      errorMessage:
        "Please fill all fields, otherwise we can't give you advice!"
    });
    return;
  }

  plantModel
    .find({
      outside: newUserTest.outside,
      lighting: newUserTest.lighting,
      humidity: newUserTest.humidity,
      animals: newUserTest.animals,
      type_of_plants: newUserTest.type_of_plants
    })
    .then(dbRes => {
      req.body = {};
      res.redirect("/profile/:id");
    })
    .catch(error => {
      console.log(error);
    });
});

/* GET the user profile page */
router.get("/profile/:id", (req, res, next) => {
  user.findById(req.params.id).then(dbRes => {
    res.render("users/user_profile", { user: dbRes });
  });
});

/* GET the page showing all plants*/
router.get("/plants", (req, res, next) => {
  plantModel
    .find()
    .then(dbRes => {
      res.render("plants/all_plants", { plants: dbRes });
    })
    .catch(error => {
      console.log(error);
    });
});

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

module.exports = router;
