const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  orderTime: { type: String, required: true, default: "9:30 AM" },
  customer: {
    name: { type: String, required: true },
    location: { type: String, required: true },
  },
  orderedDate: { type: Date, required: true },
  orderSummary: {
    productName: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  paymentSummary: {
    itemTotal: { type: Number, required: true },
    taxesAndFees: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  orderStatus: {
    status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered, etc.
    trackingLink: { type: String },
  },
});

module.exports = mongoose.model("Order", OrderSchema);
