const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
    tls: true, // Enable TLS by setting this option
  tlsAllowInvalidCertificates: true, // NOT recommended for production use
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


