import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { User } from '../../model/user.model';

const db = new sqlite3.Database('database.db');

export const deleteList = (req: Request & { user: User }, res: Response) => {
  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  db.run(
    'DELETE FROM lists WHERE user_id = ?',
    [user.id],
    (error) => {
      if (error) {
        return res.status(500).json({ message: 'Erro ao excluir a lista.' });
      }
      res.status(200).json({ message: 'Lista excluída com sucesso.' });
    }
  );
};
