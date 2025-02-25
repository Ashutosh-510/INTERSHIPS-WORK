const Order = require("./models/orderDetails");

const getAllOrderSummary = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const getOneOrderSummary = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).select("orderStatus");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getAllOrderSummary, getOneOrderSummary };
