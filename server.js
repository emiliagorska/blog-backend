require("dotenv").config();

const express = require("express");
const cors = require("cors");

//Get connection to database aka get MongoDB driver connection
const databaseConnection = require("./connect.js");
console.log(databaseConnection);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// perform a database connection when the server starts
databaseConnection.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});

module.exports = app;
