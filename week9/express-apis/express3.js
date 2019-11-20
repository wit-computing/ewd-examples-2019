import express from 'express';
import contactsRouter from './api/contacts';
import bodyParser from 'body-parser';

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api/contacts', contactsRouter);

app.listen(8080, () => {
  console.info('Express listening on port', 8080);
});