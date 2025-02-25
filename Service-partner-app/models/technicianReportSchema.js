const mongoose = require("mongoose");

const TechnicianReportSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  technicianName: { type: String, required: true },
  serviceType: { type: String, required: true },
  statistics: {
    available: { type: Number, required: true },
    onField: { type: Number, required: true },
    offline: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  performanceOverview: {
    issueResolved: { type: Number, required: true },
    servicePending: { type: Number, required: true },
  },
});

module.exports = mongoose.model("TechnicianReport", TechnicianReportSchema);
