import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { router } from './routes/routes';
import { createDb } from './database/sqlite';

const app = express();

const port = process.env.PORT ?? 3000;

createDb();

app.use(express.json());

app.use(cors());

app.use( router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});