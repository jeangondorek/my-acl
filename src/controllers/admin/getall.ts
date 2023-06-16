import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { User } from '../../model/user.model';

const db = new sqlite3.Database('database.db');

export const listUser = (req: Request & { user: User }, res: Response) => {
  db.all('SELECT * FROM users', (error, rows) => {
    if (error) {
      return res.status(500).json({ message: 'Erro ao obter os usuários.' });
    }

    const users = rows.map((row: any) => ({
      ...row,
      is_admin: Boolean(row.is_admin),
    }));

    res.json(users);
  });
};
