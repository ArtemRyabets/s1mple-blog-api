import express from 'express';
import cors from 'cors';
import postRouter from './routes/post.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/posts', postRouter);

export default app;
