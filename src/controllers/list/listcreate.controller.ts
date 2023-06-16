import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import sqlite3 from 'sqlite3';
import { List } from '../../model/list.model';
import { User } from '../../model/user.model';

const db = new sqlite3.Database('database.db');

export const createList = (req: Request & { user: User }, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O nome da lista é obrigatório.' });
  }

  const { user } = req;
  if (!user) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  const newListId = uuid();
  const newList = new List(newListId, name, user.id);

  db.run(
    'INSERT INTO lists (id, name, user_id) VALUES (?, ?, ?)',
    [newList.id, newList.name, newList.user_id],
    function (error) {
      if (error) {
        console.error('Erro ao criar a lista:', error);
        return res.status(500).json({ message: 'Erro ao criar a lista.' });
      }
      res.status(201).json({ id: newList.id, name: newList.name, userId: newList.user_id });
    }
  );
};
