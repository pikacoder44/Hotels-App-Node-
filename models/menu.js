const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taste: {
    type: String,
    enum: ["Sour", "Bitter", "Sweet"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  num_sales: {
    type: Number,
    required: true,
  },
});

let model = mongoose.model("Menu", menuSchema);
module.exports = model;
