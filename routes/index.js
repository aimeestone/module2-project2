const express = require('express');
const router = express.Router();
const user = require('../models/User');
const gardenCenter = require('../models/Gardencenter');

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});

/* GET the user profile page */

router.get('/profile', (req, res) => {
	user
		.findOne({ email: req.session.currentUser.email })
		.then((dbRes) => {
			console.log('ici', dbRes);
			res.render('users/user_profile', { user: dbRes });
		})
		.then((dbRes) => {
			res.render('plants/all_plants', { plants: dbRes });
		})
		.catch((error) => {
			console.log(error);
		});
});
});

module.exports = router;
