import Express from 'express';

const app = Express();
const port = 3000;

app.use('/dist', Express.static('dist'));

app.use('*', (req, res) => {
  res.sendFile('index.html', { "root": __dirname });
});

app.listen(port);