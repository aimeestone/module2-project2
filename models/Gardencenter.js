const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const garden_center = new Schema({
	name: String,
	coordinate: Number
});

const Garden_Center = mongoose.model('Garden_Center', garden_center);

module.exports = Garden_Center;
