const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: [
      "https://interview-frontend-lemon.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Add OPTIONS handler for preflight requests
app.options("*", cors());
// app.use(cors());
// app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose successfully connected"))
  .catch((error) =>
    console.error("Mongoose connection failed:", error.message)
  );

const authRoutes = require("./routes/auth");
const submissionRoutes = require("./routes/submissions");

app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
