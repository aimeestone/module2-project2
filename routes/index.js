const express = require('express');
const router = express.Router();
const user = require('../models/User');
const gardenCenter = require('../models/Gardencenter');

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});

router.get("/map", (req, res) => {
  res.render("users/map");
});

router.get('/map/api', (req, res) => {
	gardenCenter.find().then((dbRes) => res.send(dbRes)).catch((err) => console.log(err));
});

module.exports = router;
