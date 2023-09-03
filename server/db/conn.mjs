import mongoose from "mongoose";

mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export default mongoose.connection;