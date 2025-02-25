const TechnicianReport = require("../models/technicianReportModel");

const getFilteredReports = async (req, res) => {
  try {
    const { date, technicianName, serviceType } = req.query;
    let filter = {};

    if (date) filter.date = new Date(date);
    if (technicianName) filter.technicianName = new RegExp(technicianName, "i");
    if (serviceType) filter.serviceType = new RegExp(serviceType, "i");

    const reports = await TechnicianReport.find(filter);
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getFilteredReports };
