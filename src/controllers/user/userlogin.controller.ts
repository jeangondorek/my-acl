import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { User } from '../../model/user.model';

const db = new sqlite3.Database('database.db');

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (error, row: User) => {
      if (error || !row) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      const user = new User(row.id, row.token, row.is_admin);
      res.json({ token: user.token });
    }
  );
};
