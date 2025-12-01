import { PrismaClient, Post } from '@prisma/client';

// Підключаємо клієнт Prisma для роботи з базою
const prisma = new PrismaClient();

// Отримуємо всі пости з MongoDB
export const findAll = async (): Promise<Post[]> => {
  return await prisma.post.findMany();
};

// Створюємо новий пост у MongoDB
// (ID та дату Prisma створить сама)
export const create = async (postData: { title: string; content: string; author: string }): Promise<Post> => {
  return await prisma.post.create({
    data: {
      title: postData.title,
      content: postData.content,
      author: postData.author,
    },
  });
};
