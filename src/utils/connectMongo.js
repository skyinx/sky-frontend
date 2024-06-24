import mongoose from "mongoose";

const connection = {};

async function connectMongo() {
  if (connection.isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("Use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);

  connection.isConnected = db.connections[0].readyState;
}

export default connectMongo;
