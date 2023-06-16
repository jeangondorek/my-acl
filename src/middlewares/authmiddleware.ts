import { Request, Response, NextFunction } from 'express';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

interface CustomRequest extends Request {
  user?: any;
}

export function authenticateUser(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso não autorizado.' });
  }

  const token = authHeader.substring(7);
  db.get('SELECT * FROM users WHERE token = ?', [token], (error: any, row: any) => {
    if (error || !row) {
      return res.status(401).json({ message: 'Acesso não autorizado.' });
    }

    req.user = row;
    next();
  });
}

module.exports = {
  authenticateUser: authenticateUser
};
