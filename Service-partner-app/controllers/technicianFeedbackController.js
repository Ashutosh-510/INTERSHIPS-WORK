const Technician = require("../models/technicianFeedbackModel");

const getTechnicianFeedback = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id).select(
      "feedback"
    );
    if (!technician) {
      return res.status(404).json({ message: "Technician not found" });
    }
    res.status(200).json(technician.feedback);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getTechnicianFeedback };
