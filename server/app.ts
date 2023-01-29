import express from 'express';

const app = express();
const port = 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify({ name: 'Hello World!' }));
});

app.all('*', (req, res) => {
  res.status(404).send('404');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
