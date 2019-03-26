import dotenv from 'dotenv';
import express from 'express';
import postsRouter from './api/posts';
import bodyParser from 'body-parser';
import loadPosts from './postData';
import loadUsers from './userData';
import './db';
import usersRouter from './api/users';
import session from 'express-session';
import authenticate from './authenticate';

dotenv.config();

const app = express();

const port = process.env.PORT;

if (process.env.seedDb) {
  loadPosts();
  loadUsers();
}
//session middleware
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));

//configure body-parser
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

app.use('/api/posts', authenticate, postsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});