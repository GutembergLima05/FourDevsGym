import express from 'express'
import { allRoutes } from './src/routes/exportRoute.js';
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config()

const app = express(), port = process.env.PORT || 3000

<<<<<<< HEAD:backend/index.js

app.use(cors());
=======
app.use(cors())
>>>>>>> develop:backend/src/index.js
app.use(express.json(), allRoutes);

app.listen(port, () => console.log(`SERVIDOR ON! NA PORTA ${port} `))