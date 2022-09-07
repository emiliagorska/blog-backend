const { MongoClient, ServerApiVersion } = require("mongodb");
const connectionString =
  "mongodb+srv://emiliagorska:sommerville@blog-project-cluster.ppoy2d6.mongodb.net/?retryWrites=true&w=majority";
//initiate mongo client - local, a class tht we'll use to try to establish a connection with mongo database
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let dbConnection;

//function connecting to server?
function connectToServer(callback) {
  client.connect(function (err, mongoClient) {
    if (err || !mongoClient) {
      return callback(err);
    }
    //database connection? - pass DATABASE name as an argument (not collection)
    dbConnection = mongoClient.db("blog");
    console.log("Successfully connected to MongoDB.");
    return callback();
  });
}

function getDatabase() {
  return dbConnection;
}

module.exports = {
  connectToServer: connectToServer,
  getDatabase: getDatabase,
};

// async function run() {
//   try {
//     await client.connect();
//     collection = client.db("blog").collection("posts");
//     console.log("Connected correctly to server");
//     //if you dont have catch - if an aplication occurs, the application crashes
//   } catch (err) {
//     console.log(err.stack);
//   }
// }
// run().catch(console.dir);

//module.exports.test = "This is a test";
//exports.collection = collection;

// //actually connecting to database
// client.connect((err) => {
//   console.log(err);
//   //in db() put the name of the database
//   const collection = client.db("blog").collection("posts");
//   // perform actions on the collection object
//   console.log(collection);
//   client.close();
// });
