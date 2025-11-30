import { Request, Response } from 'express';
import * as postService from '../services/post.service';

// 1. Інтерфейс для вхідних даних
interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postService.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    // 2. Вказуємо тип даних (as CreatePostInput)
    const { title, content, author } = req.body as CreatePostInput;

    // 3. Правильна перевірка з оператором АБО (||)
    if (!title || !content || !author) {
      res.status(400).json({ message: 'Title, content and author are required' });
      return;
    }

    const newPost = await postService.create({ title, content, author });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};
