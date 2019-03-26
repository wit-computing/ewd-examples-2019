import dotenv from 'dotenv';
import express from 'express';
import contactsRouter from './api/contacts';
import bodyParser from 'body-parser';
import loadContacts from './contactsData';
import './db';


dotenv.config();

const app = express();

const port = process.env.PORT;

if (process.env.seedDb) {
  loadContacts();
}

//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/contacts', contactsRouter);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});