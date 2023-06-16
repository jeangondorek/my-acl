import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { User } from '../../model/user.model';

const db = new sqlite3.Database('database.db');

export const updateList = (req: Request & { user: User }, res: Response) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  db.run(
    'UPDATE lists SET name = ? WHERE user_id = ?',
    [req.body.name, user.id],
    (error) => {
      if (error) {
        return res.status(500).json({ message: 'Erro ao atualizar a lista.' });
      }
      res.status(200).json({ message: 'Lista atualizada com sucesso.' });
    }
  );
};
