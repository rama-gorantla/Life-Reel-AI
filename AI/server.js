require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
});
const User = mongoose.model("User", userSchema);

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Validation (same as before)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z ]{3,}$/;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields." });
  }
  if (!nameRegex.test(name)) {
    return res.status(400).json({ error: "Name must contain only letters and spaces, with at least 3 characters." });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character." });
  }

  // Check if user already exists
  if (await User.findOne({ email })) {
    return res.status(409).json({ error: "Email already registered." });
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Save user
  await User.create({ name, email, passwordHash });

  return res.json({ success: true, message: "Signup successful!" });
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = await User.findOne({ email });
  console.log("email", email);
  if (!user) {
    console.log("User:", user);
    return res.status(401).json({ error: "Invalid email or password." });
  }
  
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    console.log("User:", user);
    console.log("Password Match:", isMatch);
    return res.status(401).json({ error: "Invalid email or password." });
  }

  // In production, generate and return a JWT token here
  return res.json({
    success: true,
    user: { email: user.email, name: user.name },
    token: "dummy-jwt-token"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Frontend signup handler (for reference, not part of the server code)
const handleSignup = async () => {
  try {
    const response = await fetch("http://localhost:4000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    
    if (data.success) {
      // Example actions:
      alert("Signup successful! Please log in.");
      // router.push("/logIn"); // If using expo-router
      // setName(""); setEmail(""); setPassword(""); // Clear form
    } else {
      setError(data.error || "Signup failed");
    }
  } catch (err) {
    setError("Network error");
  }
};