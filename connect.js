const { MongoClient, ServerApiVersion } = require("mongodb");
const connectionString =
  "mongodb+srv://emiliagorska:sommerville@blog-project-cluster.ppoy2d6.mongodb.net/?retryWrites=true&w=majority";
//initiate mongo client - local, a class that we'll use to try to establish a connection with mongo database
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

let dbConnection;

//function connecting to server?
function connectToServer(callback) {
  client.connect(function (err, mongoCluster) {
    if (err || !mongoCluster) {
      return callback(err);
    }
    //bunch of console logs to look into what's happening
    console.log("WILL PRINT MONGOCLIENT");
    //mongoClient seems to be an object with properties, one of them perhaps  being db? not sure though
    console.log(mongoCluster);
    console.log("WILL PRINT MONGOCLIENT.DB");
    //mongoClient.db seems to be an object refering to the particular database (database of name passed as an argument?)
    console.log(mongoCluster.db("blog"));
    console.log("END OF PRINT MONGOCLIENT.DB");
    //database connection? - pass DATABASE name as an argument (not collection)
    dbConnection = mongoCluster.db("blog");
    console.log("Successfully connected to MongoDB.");
    return callback();
  });
}

function getDatabase() {
  return dbConnection;
}

//FROM THE TUTORIAL: The main object this module exports out is the _db variable (possibly the dbConnection?), which will hold the "sample_airbnb" database-level object. Via this object, we will be able to access any collection within that database or change its context to another database
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
