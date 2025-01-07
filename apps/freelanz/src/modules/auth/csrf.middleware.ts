import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // Assuming JWT is used to identify users
import * as crypto from 'crypto';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private readonly csrfSecret = process.env.CSRF_SECRET || 'your-secure-secret';
  use(req: Request, res: Response, next: NextFunction) {
    const stateChangingMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
    if (!stateChangingMethods.includes(req.method)) {
      return next();
    }

    const csrfToken = req.headers['x-csrf-token'];
    const authHeader = req.headers['authorization'];

    if (!csrfToken || !authHeader) {
      return res
        .status(403)
        .json({ message: 'Missing CSRF token or Authorization header' });
    }

    try {
      const jwtToken = authHeader.split(' ')[1];
      const decoded: any = jwt.verify(
        jwtToken,
        process.env.ACCESS_TOKEN_SECRET,
      );
      const userId = decoded.userId;

      const expectedToken = crypto
        .createHmac('sha256', this.csrfSecret)
        .update('t' + userId)
        .digest('hex');

      if (csrfToken !== expectedToken) {
        return res.status(403).json({ message: 'Invalid CSRF token' });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid JWT or CSRF token' });
    }
  }
}
