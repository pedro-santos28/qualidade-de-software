import express from 'express';
import routes from './routes/index';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log('Server started on port: ', port);
});
