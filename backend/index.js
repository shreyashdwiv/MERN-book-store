import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoutes.js"

import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to shreyash app");
});

app.use("/books",booksRoute);


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
