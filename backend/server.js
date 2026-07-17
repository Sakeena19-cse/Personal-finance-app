const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("DB Error:", err));

app.get("/", (req, res) => {
  res.json({ message: "Finance Tracker API is running 💰" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions",transactionRoutes);
app.get("/test", (req, res) => {
  res.send("Server is working");
});
