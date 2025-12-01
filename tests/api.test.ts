import request from 'supertest';
import app from '../src/app';
import { PrismaClient } from '@prisma/client';


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

describe('API Integration Tests (E2E)', () => {
  
  // Тест 1: GET /api/v1/posts
  it('GET /api/v1/posts має повернути статус 200 і масив', async () => {
    const mockPosts = [{ id: '1', title: 'Test API', content: 'Content', author: 'Bot', createdAt: new Date().toISOString() }];
    

    (prisma.post.findMany as jest.Mock).mockResolvedValue(mockPosts);

    const response = await request(app).get('/api/v1/posts');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].title).toBe('Test API');
  });

  // Тест 2: POST /api/v1/posts
  it('POST /api/v1/posts має створити пост і повернути 201', async () => {
    const newPost = { title: 'E2E Post', content: 'Supertest', author: 'Tester' };
    const createdPost = { id: '123', ...newPost, createdAt: new Date().toISOString() };

    (prisma.post.create as jest.Mock).mockResolvedValue(createdPost);

    const response = await request(app)
      .post('/api/v1/posts')
      .send(newPost);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newPost.title);
  });

  // Тест 3: Валідація (Error Case)
  it('POST /api/v1/posts має повернути 400, якщо дані неповні', async () => {
    const response = await request(app)
      .post('/api/v1/posts')
      .send({ title: 'No Content' }); 

    expect(response.status).toBe(400);
  });
});