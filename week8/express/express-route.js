import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/contacts', (req,resp)=>{resp.end('I should really be a collection of contacts');});

app.listen(8080, () => {
  console.info('Express listening on port', 8080);
});