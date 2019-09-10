const express = require('express');
const router = express.Router();
const user = require('../models/User');
const plantModel = require('../models/Plant');
const gardenCenter = require('../models/Gardencenter');

/* GET home page */
router.get('/', (req, res, next) => {
	res.render('index');
});

// POSTING the survey responses
router.get('/survey', (req, res, next) => {
	user
		.findById(req.params.id)
		.then((dbRes) => {
			res.render('users/survey', { user: dbRes });
		})
		.catch((error) => {
			console.log(error);
			return next(dbErr);
		});
});

router.post('/survey', (req, res, next) => {
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

	// if (!outside || !lighting || !humidity || !animals || !type_of_plants) {
	//   res.render("users/survey", {
	//     errorMessage: "Please fill all fields, otherwise we can't give you advice!"
	//   });
	//   return;
	// }

	user
		.findOneAndUpdate({ email: currentUser.email }, newUserTest)
		.then((dbRes) => {
			console.log(dbRes);
			if (dbRes.habitation === 'both') {
				dbRes.habitation === {};
			}
			plantModel
				.find({
					environment: {
						outside: { $in: [ dbRes.habitation.outside ] },
						lighting: { $in: [ dbRes.habitation.lighting ] },
						humidity: { $in: [ dbRes.habitation.humidity ] },
						animals: { $in: [ dbRes.habitation.animals ] },
						type_of_plant: { $in: [ dbRes.habitation.type_of_plant ] }
					}
				})
				.then((response) => {
					console.log(response);
					user
						.findOneAndUpdate({ email: currentUser.email }, { plant_test: response })
						.then((answer) => res.redirect('/profile'))
						.catch((dbErr) => console.log(dbErr));
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((err) => console(err));

	// plantModel
	// .find({
	//   outside: newUserTest.outside,
	//   lighting: newUserTest.lighting,
	//   humidity: newUserTest.humidity,
	//   animals: newUserTest.animals,
	//   type_of_plants: newUserTest.type_of_plants
	// })
	// .then(dbRes => {
	//   req.body = {};
	//   res.redirect("/profile");
	// })
	// .catch(error => {
	//   console.log(error);
	// });
});

/* GET the user profile page */
// router.get('');
// user
// 	.findById({ email: req.session.currentUser.email })
// 	.then((dbRes) => {
// 		res.render('users/user_profile', { user: dbRes });
// 	})
// 	.then((dbRes) => {
// 		res.render('plants/all_plants', { plants: dbRes });
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	})
// 	.find()
// 	.then((dbRes) => {
// 		res.render('plants/all_plants', { plants: dbRes });
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

/* GET the page showing ONE plant */
router.get('/plants/:id', (req, res, next) => {
	plantModel
		.findById(req.params.id)
		.then((dbRes) => {
			res.render('plants/one_plant', { plant: dbRes });
		})
		.catch((error) => {
			console.log(error);
		});
});

router.get('/map', (req, res) => {
	res.render('users/map');
});

router.get('/map/api', (req, res) => {
	gardenCenter.find().then((dbRes) => res.send(dbRes)).catch((err) => console.log(err));
});

module.exports = router;
