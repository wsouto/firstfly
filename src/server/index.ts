import { Hono } from 'hono';
import { authMiddleware } from './middleware/auth';

const app = new Hono();

app.use(authMiddleware).get('/api/health', (c) => c.json('Healthy'));

export default app;
