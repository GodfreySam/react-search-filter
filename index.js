const createError = require("http-errors");
const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");


require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.send("API is working properly");
});

app.get("/api", cors(), async (req, res, next) => {
  try {
    const fetchData = await axios(
      "https://partners.9ijakids.com/index.php?partnerId=555776&accessToken=l0lawtvv-94bv-oi4d-u808-5ubz&action=catalogfilter"
    );

    const response = await fetchData;

    // console.log(response.data )

    return res.json({ data: response.data });
  } catch (err) {
    console.log(err);
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));
//set locals to only provide error in development
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`API is up at port ${port} ...`);
});

module.exports = app;
