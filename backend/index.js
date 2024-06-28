const express = require('express');
const { allRoutes } = require('./src/routes/exportRoute.js');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(allRoutes);

app.listen(port, () => {
  console.log(`SERVIDOR ON! NA PORTA ${port}`);
});
