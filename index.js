const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.4vlbiwo.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
    });