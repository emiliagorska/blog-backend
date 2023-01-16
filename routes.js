const express = require("express");
//var app = express();
const { ObjectId } = require("mongodb");

const recordRoutes = express.Router();

const databaseConnection = require("./connect.js");

//app.get("/listings", async (req, res) => {
recordRoutes.route("/blogs").get(async function (req, res) {
  const getDatabase = databaseConnection.getDatabase();
  //console.log("AAAAA", getDatabase.collection("posts"));

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
  // try {
  getDatabase
    .collection("posts")
    .find(query)
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      }
      if (result.length == 0) {
        res.status(404).send("Error -listing not found!");
      } else {
        res.json(result);
      }
    });
  // }
  // catch (err) {
  //   console.log("ERROR LINE 44", err);
  //   res.status(404).send("Error -listing not found!");
  // }
});

module.exports = recordRoutes;
