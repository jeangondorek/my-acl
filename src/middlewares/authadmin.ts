import { Request, Response, NextFunction } from 'express';
import { User } from '../model/user.model';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

export function authadmin(req: Request & { user?: User }, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Acesso não autorizado.' });
  }

  const token = authHeader.substring(7);
  db.get('SELECT * FROM users WHERE token = ?', [token], (error: any, row: User) => {
    if (error || !row) {
      return res.status(401).json({ message: 'Acesso não autorizado.' });
    }

    if (!row.is_admin) {
      return res.status(403).json({ message: 'Acesso negado. Somente administradores podem acessar esta rota.' });
    }

    req.user = row;
    next();
  });
}

module.exports = {
  authadmin: authadmin
};
