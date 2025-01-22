require("dotenv").config({ path: "./.env" });
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const PORT = 5000;

//Mongo Connection

mongoose
  .connect("mongodb://127.0.0.1:27017/Techno-Job-portal", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error in connection to the database: ", err);
  });

// Schema
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Job Apply data
const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobId: { type: String, required: true },
    resume: { type: String, required: true },
    coverLetter: { type: String },
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

// Sign Up API
app.post("/api/signup", async (req, res) => {
  const { fullName, userName, emailAddress, password, confirmPassword } =
    req.body;
  console.log(fullName, userName, emailAddress, password, confirmPassword);

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

  try {
    const newUser = new User({ fullName, userName, emailAddress, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error saving user to database", details: err.message });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  const { emailAddress, password } = req.body;
  console.log(emailAddress, password);
  if (!emailAddress || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ emailAddress });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    res.status(200).json({
      message: "Login successful",
      user: { emailAddress: user.emailAddress, fullName: user.fullName },
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error during authentication", details: err.message });
  }
});

app.post("/api/apply", async (req, res) => {
  const { userId, jobId, resume, coverLetter } = req.body;

  // Validate required fields
  if (!userId || !jobId || !resume) {
    return res
      .status(400)
      .json({ error: "User ID, Job ID, and Resume are required" });
  }

  try {
    const newApplication = new JobApplication({
      userId,
      jobId,
      resume,
      coverLetter,
    });
    await newApplication.save();
    res
      .status(201)
      .json({
        message: "Job application submitted successfully",
        application: newApplication,
      });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Error saving job application to database",
        details: err.message,
      });
  }
});

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
