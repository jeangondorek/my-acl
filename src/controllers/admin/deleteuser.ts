import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { User } from '../../model/user.model';

const db = new sqlite3.Database('database.db');

export const deleteUser = (req: Request & { user: User }, res: Response) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ message: 'Apenas administradores podem excluir usuários.' });
  }

  db.run('DELETE FROM users WHERE id = ?', req.params.id, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao excluir o usuário.' });
    }

    res.json({ message: 'Usuário excluído com sucesso.' });
  });
};