import Express from 'express';
import bodyParser from 'body-parser';

const app = Express();

app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/healthcheck', (req, res) => {
  res.sendStatus(200);
});

export { app };
