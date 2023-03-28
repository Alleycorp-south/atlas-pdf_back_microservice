import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';

import { pdfController } from './modules/pdf/pdf.controller';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// enable cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/pdf', pdfController);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});