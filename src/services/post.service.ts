import { PrismaClient } from '@prisma/client';

import { BlogManager } from '../../libs/blog-core/post-manager';


export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


const blogManager = new BlogManager(prisma);


export const findAll = async () => {
    return await blogManager.getAllPosts();
};

export const create = async (postData: { title: string; content: string; author: string }) => {
    return await blogManager.createPost(postData);
};