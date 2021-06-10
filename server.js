const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const route = require("./routes");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const fileUploads = require("express-fileupload");
const cors = require("cors");

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to db"))
  .catch((error) => console.error("error", error));

app.use(cors()); // cross origin resource sharing
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUploads());
app.use(express.json()); // req.body middleware

// Middleware for handling file
app.use((req, res, next) => {
  if (req.files) {
    req.body = JSON.parse(req.body.data);
  }

  return next();
});

app.use("/api", route);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
// connect to server
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
