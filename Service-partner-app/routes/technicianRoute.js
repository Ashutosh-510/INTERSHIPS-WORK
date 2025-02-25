const express = require("express");
const { getFilteredReports } = require("../controllers/technicianReport");

const router = express.Router();

router.get("/", getFilteredReports);

module.exports = router;
