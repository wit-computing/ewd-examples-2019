import dotenv from 'dotenv';
import express from 'express';
import contactsRouter from './api/contacts';
import postsRouter from './api/posts';
import usersRouter from './api/users';
import bodyParser from 'body-parser';
import './db';
import passport from './auth';


dotenv.config();

export const app = express();

const port = process.env.PORT;

app.use(passport.initialize());


//configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/contacts', contactsRouter);

app.use('/api/posts', passport.authenticate('jwt', {
  session: false
}), postsRouter);

app.use('/api/users', usersRouter);

app.use(express.static('public'));

app.use((err, req, res) => {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});