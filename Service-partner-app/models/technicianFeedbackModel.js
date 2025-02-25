const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const TechnicianSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  feedback: [feedbackSchema], // Array of feedback objects
});

module.exports = mongoose.model("Technician", TechnicianSchema);
