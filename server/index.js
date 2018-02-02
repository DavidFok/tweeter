"use strict";

const PORT               = 8080;
const express            = require("express");
const bodyParser         = require("body-parser");
const app                = express();
const MongoClient        = require("mongodb").MongoClient;
const uri                = 'mongodb://localhost:27017/tweeter';
const path               = require('path');
const nodeSassMiddleware = require('node-sass-middleware');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(nodeSassMiddleware({
  src: path.join(__dirname, '../styles'),
  dest: path.join(__dirname, '../public/styles'),
  prefix: '/styles',
  debug: true,
  outputStyle: 'compressed'
}));

app.use(express.static('public'));


MongoClient.connect(uri, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${uri}`);
    throw err;
  }
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  app.use("/tweets", tweetsRoutes);

  app.listen(PORT, () => {
    console.log("Example app listening on port " + PORT);
  });
});
