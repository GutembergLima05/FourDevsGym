import express from 'express'
import { allRoutes } from './routes/exportRoute.js';
import dotenv from 'dotenv'

dotenv.config()

const app = express(), port = process.env.PORT || 3000

app.use(express.json(), allRoutes);

app.listen(port, () => console.log(`SERVIDOR ON! NA PORTA ${port} `))