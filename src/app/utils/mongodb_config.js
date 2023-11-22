const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://Admin:admin@cluster0.skvmb5x.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
    console.log("Connected to MongoDB");
  }
  return { db: client.db("alchemi") };
}



async function pingDatabase() {
  try {
    const { db } = await connectToDatabase();
    await db.command({ ping: 1 });
    console.log("Successfully pinged the MongoDB database.");
    return true;
  } catch (err) {
    console.error("Failed to ping the MongoDB database:", err);
    return false;
  }
}

module.exports = { connectToDatabase, pingDatabase };


