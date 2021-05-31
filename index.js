const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup static directory to serve
app.use(express.static(path.resolve('client', 'build')));

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
      return res.status(500).send("Error.");
  }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`API is up at port ${port} ...`);
});

module.exports = app;
