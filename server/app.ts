import express from 'express';
import routes from './routes/index';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log('Server started on port: ', port);
});
