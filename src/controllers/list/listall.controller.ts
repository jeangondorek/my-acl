import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { List } from '../../model/list.model';
import { User } from '../../model/user.model';

const db = new sqlite3.Database('database.db');

export const listAll = (req: Request & { user: User }, res: Response) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  db.all(
    'SELECT * FROM lists WHERE user_id = ?',
    [user.id],
    (error, rows: List[]) => {
      if (error) {
        return res.status(500).json({ message: 'Erro ao obter as listas.' });
      }
      res.json(rows);
    }
  );
};
