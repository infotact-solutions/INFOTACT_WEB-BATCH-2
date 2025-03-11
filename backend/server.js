require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const uploadRoutes = require("./routes/uploadRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", uploadRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
