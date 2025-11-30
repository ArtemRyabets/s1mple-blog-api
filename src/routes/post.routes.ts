import { Router } from 'express';
import * as postController from '../controllers/post.controller';

const router = Router();

router.get('/', postController.getPosts);
router.post('/', postController.createPost);

export default router;
