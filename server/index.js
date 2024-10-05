const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend (React)
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Define a simple User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, default: "user" }, // Default role is user, could be "admin"
});

const User = mongoose.model("User", userSchema);

// Define a simple Result Schema for results (e.g., exam or dashboard results)
const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: Number,
  date: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", resultSchema);

// Routes

// Route to create a user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Route to get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Route to create a result for a user
app.post("/api/results", async (req, res) => {
  try {
    const { userId, score } = req.body;
    const result = new Result({ userId, score });
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating result", error });
  }
});

// Route to get results for a specific user
app.get("/api/results/:userId", async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error });
  }
});

// Route to handle user login
app.post("/api/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
