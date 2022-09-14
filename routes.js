const express = require("express");
//var app = express();
const { ObjectId } = require("mongodb");

const recordRoutes = express.Router();

const databaseConnection = require("./connect.js");

//app.get("/listings", async (req, res) => {
recordRoutes.route("/blogs").get(async function (req, res) {
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

recordRoutes.route("/blogs/:id").get(async function (req, res) {
  const getDatabase = databaseConnection.getDatabase();
  let idsearched = req.params.id;
  var query = { _id: ObjectId(idsearched) };
  getDatabase
    .collection("posts")
    .find(query)
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
