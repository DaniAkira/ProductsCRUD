const express = require("express");
const mongoose = require("mongoose");
const app = express(); 
require("dotenv").config();
const productsRoutes = require("./routes/productsRoutes");
const filterRoutes = require("./routes/filterRoutes");
const brandFilterRoutes = require("./routes/brandFilterRoutes");

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/products", productsRoutes, filterRoutes);

app.use("/products/filter", filterRoutes);

app.use("/products/filter/brand", brandFilterRoutes);


mongoose.Promise = global.Promise;
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.4vlbiwo.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(`Houve um erro ao se conectar ao MongoDB. ${err}`);
  });
