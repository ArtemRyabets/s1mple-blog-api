import { Post } from '../models/post.model';
import { v4 as uuidv4 } from 'uuid';

// Наше сховище в пам'яті
const posts: Post[] = [
  {
    id: '1',
    title: 'Мій перший пост',
    content: 'Це тестовий пост, створений автоматично.',
    author: 'Admin',
    createdAt: new Date().toISOString(),
  },
];

export const findAll = async (): Promise<Post[]> => {
  return posts;
};

export const create = async (postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
  const newPost: Post = {
    id: uuidv4(),
    ...postData,
    createdAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return newPost;
};
