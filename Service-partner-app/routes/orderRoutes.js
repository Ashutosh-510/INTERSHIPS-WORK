const express = require("express");
const {
  getAllOrders,
  getOrderStatus,
} = require("../controllers/orderSummaryController");

const router = express.Router();

router.get("/", getAllOrders); // Get all orders
router.get("/:id/status", getOrderStatus); // Get order status by ID

module.exports = router;
