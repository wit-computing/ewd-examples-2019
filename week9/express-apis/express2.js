import express from 'express';
import contactsRouter from './api/contacts';

const app = express();

app.use(express.static('public'));
app.use('/api/contacts', contactsRouter);

app.listen(8080, () => {
  console.info('Express listening on port', 8080);
});