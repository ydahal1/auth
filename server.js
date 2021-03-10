import express from "express";
import { router } from "./routes/auth.js";
import { connectDb } from "./config/db.js";

//initialize
const app = express();

//Db conection
connectDb();

//Middlewares
app.use(express.json());

// connect routes
app.use("/api/auth", router);

//Port
const PORT = process.env.PORT || 9000;

//Listining ports
const server = app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged error : ${err}`);
  server.close(() => process.exit());
});
