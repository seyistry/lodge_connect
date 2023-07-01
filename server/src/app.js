// importing npm modules
const express = require('express');
const cors = require('cors');

const app = express();

// setting up the modules object
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
