const express = require("express");
//var app = express();

const recordRoutes = express.Router();

const databaseConnection = require("./connect.js");

//app.get("/listings", async (req, res) => {
recordRoutes.route("/listings").get(async function (req, res) {
  const getDatabase = databaseConnection.getDatabase();

  getDatabase
    .collection("posts")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

module.exports = recordRoutes;
