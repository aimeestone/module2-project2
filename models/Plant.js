const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plants = new Schema({
  name: String,
  descriptif: String,
  advice: String,
  environment: {
    outside: { type: String, enum: ["outside", "inside"] },
    lighting: { type: String, enum: ["low to none", "softened", "direct"] },
    humidity: { type: String, enum: ["dry", "normal", "dry"] },
    animals: { type: String, enum: ["pet friendly", "no pet"] },
    type_of_plant: { type: String, enum: ["green plant", "plant with flowers"] }
  },
  avatar: String
});

const Plants = mongoose.model("Plants", plants);

module.exports = Plants;
