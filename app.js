require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
const kyzRoute = require("./routes/kycRoute");
const profileRoute = require("./routes/profileRoute");
const postRoute = require("./routes/postRoute");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("successfully connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(kyzRoute);
app.use(profileRoute);
app.use(postRoute);
app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ message: error.message || "server error" });
});
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
