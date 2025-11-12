const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const testsRoutes = require("./routes/tests");
const uploadRoutes = require("./routes/upload");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tests", testsRoutes);

app.use("/api/upload", uploadRoutes);

app.listen(process.env.PORT ?? 5000, () => {
  console.log(`Server started on port ${process.env.PORT ?? 5000}`);
});
