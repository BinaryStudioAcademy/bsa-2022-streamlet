import Express from 'express';
import bodyParser from 'body-parser';

const app = Express();

app.use(Express.json());
app.use(bodyParser.urlencoded({ extended: true }));

export { app };
