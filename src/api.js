require("dotenv").config();

const express = require("express");
const cors = require("cors");

const serverless = require("serverless-http");

//Get connection to database aka get MongoDB driver connection
// const databaseConnection = require("./connect.js");
// console.log("DATABASE CONNECTION:", databaseConnection);

//const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
//app.use(require("./routes"));

//const recordRoutes = require("./routes")

// // Create a router to handle routes
const recordRoutes = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
recordRoutes.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});



// // perform a database connection when the server starts
// databaseConnection.connectToServer(function (err) {
//   if (err) {
//     console.error(err);
//     process.exit();
//   }

//   // start the Express server
//   app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
//   });
//});

app.use(`/.netlify/functions/api`, recordRoutes);

module.exports = app;
module.exports.handler = serverless(app);
