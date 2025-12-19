import { createMiddleware } from 'hono/factory';
import { jwtVerify, createRemoteJWKSet } from 'jose';

export const authMiddleware = createMiddleware(async (c, next) => {
  // Verify the POLICY_AUD environment variable is set
  if (c.env.ENVIRONMENT === 'development') {
    await next();
  }

  if (!c.env.POLICY_AUD) {
    return c.json('Missing required audience', 403);
  }

  // Get the JWT from the request headers
  const token = c.req.header('cf-access-jwt-assertion');

  // Check if token exists
  if (!token) {
    return c.json('Missing required CF Access JWT', 403);
  }

  try {
    // Create JWKS from your team domain
    const JWKS = createRemoteJWKSet(new URL(`${c.env.CF_ACCESS_DOMAIN}/cdn-cgi/access/certs`));

    // Verify the JWT
    await jwtVerify(token, JWKS, {
      issuer: c.env.CF_ACCESS_DOMAIN,
      audience: c.env.POLICY_AUD,
    });

    // Token is valid, proceed with your application logic
    await next();
  } catch (error) {
    // Token verification failed
    const e = error as Error;
    c.json({ message: `Invalid token: ${e.message}` }, 403);
  }
});
