const express = require("express");
const router = express.Router();
const PlantModel = require("./../models/Plant");
const UserModel = require("./../models/User");

/*Create an index to allo text searc

/*GET all plants catalog*/

router.get("/plants", (req, res) => {
  PlantModel.find()
    .then(dbRes =>
      res.render("plants/all_plants", { plants: dbRes, script: "script.js" })
    )
    .catch(err => console.log(err));
});

router.post("/plants/filter", (req, res) => {
  if (req.body.outside.length === 0) {
    req.body.outside = ["outdoor", "indoor"];
  }
  if (req.body.lighting.length === 0) {
    req.body.lighting = ["low to none", "softened", "direct"];
  }
  if (req.body.humidity.length === 0) {
    req.body.humidity = ["dry", "normal", "quite"];
  }
  if (req.body.animals.length === 0) {
    req.body.animals = ["pet friendly", "not pet friendly"];
  }
  if (req.body.type.length === 0) {
    req.body.type = ["green plant", "plant with flowers"];
  }

  let query = {
    $and: [
      { "environment.outside": { $in: req.body.outside } },
      { "environment.lighting": { $in: req.body.lighting } },
      { "environment.humidity": { $in: req.body.humidity } },
      { "environment.animals": { $in: req.body.animals } },
      { "environment.type_of_plant": { $in: req.body.type } }
    ]
  };

  PlantModel.find(query)
    .then(dbRes => {
      // console.log("response", dbRes);
      res.send(dbRes);
    })
    .catch(err => console.log(err));
});

/*search*/

router.post("/plants/search", (req, res) => {
  let query = req.body.search;
  if (req.body.search.length === 0) {
    PlantModel.find()
      .then(dbRes => {
        console.log("response", dbRes);
        res.send(dbRes);
      })
      .catch(err => console.log(err));
  } else {
    console.log("req", req.body.search);
    PlantModel.find({ $text: { $search: query } })
      .then(dbRes => {
        console.log("response", dbRes);
        res.send(dbRes);
      })
      .catch(err => console.log(err));
  }
});

/* GET the page showing ONE plant */

router.get("/plants/:id", (req, res, next) => {
  PlantModel.findById(req.params.id)
    .then(dbRes => {
      res.render("plants/one_plant", { plant: dbRes });
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("/plants/fav", (req, res) => {
  let query = {};

  console.log("req.body", req.body.hearts);
  if (req.body.hearts.length) {
    console.log("query", query);
    query = req.body.hearts;
  }
  UserModel.findOneAndUpdate(
    { email: req.session.currentUser.email },
    { favorite_plants: query }
  )
    .then(plants => res.send(plants))
    .catch(err => console.log(err));
});

router.post("/plants/savefav", (req, res) => {
  UserModel.findOne({ email: req.session.currentUser.email })
    .then(response => {
      res.send(response);
    })
    .catch(error => console.log(err));
});

module.exports = router;
