import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`Connected on ${con.connection.host}`);
  } catch (err) {
    console.log(`Error Connecte DB : ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
