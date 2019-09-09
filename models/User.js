const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
	name: String,
	email: String,
	password: String,
	avatar: {
		type: String,
		default: 'https://res.cloudinary.com/justineg/image/upload/v1568024154/default-picture_0_0_ywnkls.png'
	},
	habitation: {
		outside: { type: String, enum: [ 'outdoor', 'indoor' ] },
		lighting: { type: String, enum: [ 'low to none', 'softened', 'direct' ] },
		humidity: { type: String, enum: [ 'dry', 'normal', 'quite' ] },
		animals: { type: String, enum: [ 'pet friendly', 'not pet friendly' ] },
		type_of_plant: { type: String, enum: [ 'green plant', 'plant with flowers' ] }
	},
	plant_test: {
		type: Schema.Types.ObjectId,
		ref: 'Plant'
	},
	plant_owned: {
		type: Schema.Types.ObjectId,
		ref: 'Plant'
	}
});

const User = mongoose.model("Users", user);

module.exports = User;
