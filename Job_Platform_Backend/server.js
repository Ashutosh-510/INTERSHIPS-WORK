require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 5000;

// Sign UP API
app.post("/api/signup", (req, res) => {
  const { fullName, userName, emailAddress, password, confirmPassword } =
    req.body;

  if (
    !fullName ||
    !userName ||
    !emailAddress ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const newUser = { fullName, userName, emailAddress };
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
});

// Login API
app.post("/api/login", (req, res) => {
  const { emailAddress, password } = req.body;

  if (!emailAddress || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const mockUser = { emailAddress: "test@example.com", password: "123456" };

  if (
    emailAddress === mockUser.emailAddress &&
    password === mockUser.password
  ) {
    res
      .status(200)
      .json({ message: "Login successful", user: { emailAddress } });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
