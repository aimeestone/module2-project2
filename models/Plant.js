const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plants = new Schema({
  name: String,
  descriptif: String,
  advice: String,
  environment: {
    outside: { type: [String], enum: ["outdoor", "indoor"] },
    lighting: { type: [String], enum: ["low to none", "softened", "direct"] },
    humidity: { type: [String], enum: ["dry", "normal", "quite"] },
    animals: { type: [String], enum: ["pet friendly", "not pet friendly"] },
    type_of_plant: {
      type: [String],
      enum: ["green plant", "plant with flowers"]
    }
  },
  avatar: String
});

plants.index({ name: "text", descriptif: "text" });

const Plants = mongoose.model("Plants", plants);

module.exports = Plants;
