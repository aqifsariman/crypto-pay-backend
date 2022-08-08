import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';

const PORT = process.env.PORT || 3004;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello there! Welcome to the server!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}. Here we go! 🚀`);
});
