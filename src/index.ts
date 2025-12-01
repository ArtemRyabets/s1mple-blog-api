import express from 'express';
import cors from 'cors';
import postRouter from './routes/post.routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Підключаємо маршрути
app.use('/api/v1/posts', postRouter);

app.get('/', (req, res) => {
  res.send('<h1>Сервер працює!!!!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
