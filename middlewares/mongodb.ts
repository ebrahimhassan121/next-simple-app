import mongoose from 'mongoose';

let isConnected: mongoose.ConnectionStates;

async function dbConnect() {
  console.log(`isConnected`, isConnected);
  if (isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(`${process.env.MONGODB_URI}`, {});
  isConnected = db.connections[0].readyState;
}

export const connectToDatabase = dbConnect;
