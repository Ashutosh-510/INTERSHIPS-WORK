const express = require("express");
const connectDB = require("./config/db");
const technicianReportRoutes = require("./routes/technicianReportRoutes");
const technicianRoutes = require("./routes/technicianFeedbackRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/reports", technicianReportRoutes);
app.use("/api/technicians", technicianRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
