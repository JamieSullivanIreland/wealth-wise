import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (connected || !process.env.MONGO_DB_URI) {
    console.log('DB connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    connected = true;
  } catch (e) {
    console.log(e);
  }
};

export default connectDB;
