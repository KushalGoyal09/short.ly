const express = require("express");
const connect = require("./db/connect");
const notFound = require("./middleware/not-Found");
const errorHandler = require("./middleware/error-Handler");
require("express-async-errors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/login", require("./routes/login"));
app.use("/api/signup", require("./routes/signup"));
app.use("/api/url", require("./routes/url"));
app.use("/api/analytics", require("./routes/analytics"));
app.use("/api/me", require("./routes/userinfo"));
app.use("/api/allurl", require("./routes/allurl"));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log("Server is listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
