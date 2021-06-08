const express = require('express');
const route = require('./Utils/router');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config()

const mongoConnection = process.env.MONGO_URI

const app = express();

mongoose.connect(mongoConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, () => console.log('Conectado Opa!'))

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(process.env.PORT || 2222);