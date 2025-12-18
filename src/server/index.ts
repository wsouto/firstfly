import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors({ origin: '*' }));
app.get('/api/health', (c) => c.json('Healthy!'));

export default app;
