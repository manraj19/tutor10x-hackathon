require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const focusRoutes = require("./routes/focusSession");

const app = express();
app.use(express.json());
app.use("/api", focusRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas connected");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
