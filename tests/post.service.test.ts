import { create, findAll } from '../src/services/post.service';
import { PrismaClient } from '@prisma/client';

// 1. Мокаємо (підміняємо) Prisma, щоб не писати в реальну базу
jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    post: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient();

describe('Post Service Unit Tests', () => {
  // Тест 1: Перевірка отримання постів
  it('findAll має повертати список постів', async () => {
    const mockPosts = [
      { id: '1', title: 'Test Post', content: 'Content', author: 'User', createdAt: new Date() }
    ];
    
    // Кажемо призмі: "Коли тебе спитають findMany, поверни цей масив"
    (prisma.post.findMany as jest.Mock).mockResolvedValue(mockPosts);

    const result = await findAll();
    
    expect(result).toEqual(mockPosts);
    expect(prisma.post.findMany).toHaveBeenCalled();
  });

  // Тест 2: Перевірка створення поста
  it('create має створити новий пост', async () => {
    const inputData = { title: 'New', content: 'Post', author: 'Dev' };
    const createdPost = { id: '2', ...inputData, createdAt: new Date() };

    // Кажемо призмі: "Коли спитають create, поверни готовий обєкт"
    (prisma.post.create as jest.Mock).mockResolvedValue(createdPost);

    const result = await create(inputData);

    expect(result).toEqual(createdPost);
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: inputData,
    });
  });
});