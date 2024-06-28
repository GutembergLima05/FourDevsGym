const express = require('express');
const { allRoutes } = require('./src/routes/exportRoute.js');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()

const app = express(), port = process.env.PORT || 3000

app.use(cors());
app.use(express.json(), allRoutes);

app.listen(port, () => console.log(`SERVIDOR ON! NA PORTA ${port} `))