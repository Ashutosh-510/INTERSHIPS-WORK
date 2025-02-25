const express = require("express");
const {
  getTechnicianFeedback,
} = require("../controllers/technicianController");

const router = express.Router();

router.get("/:id/feedback", getTechnicianFeedback);

module.exports = router;
