const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const garden_center = new Schema({
	name: String,
	lat: Number,
	long: Number,
	adresse: String
});

const Garden_Center = mongoose.model('Garden_Center', garden_center);

module.exports = Garden_Center;
