import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Dahal:VlPcEaDg0eN45IUT@cluster0.xdtjs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    }
  );
  console.log("MONGO DB CONNECTED");
};
