import dotenv from 'dotenv';
import express from 'express';
import postsRouter from './api/posts';
import usersRouter from './api/users';
import contactsRouter from './api/contacts';
import bodyParser from 'body-parser';
import './db';
import passport from './auth';


dotenv.config();

export const app = express(); //replaces the previous const app = express();

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

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});

