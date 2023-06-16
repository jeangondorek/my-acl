import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('database.db');

export const registerUser = (req: Request, res: Response) => {
  const { username, password, isAdmin } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (error, row) => {
    if (error || row) {
      return res.status(409).json({ message: 'Usuário já existe.' });
    }

    const token = uuid();
    const id = uuid();

    db.run(
      'INSERT INTO users (id, username, password, token, is_admin) VALUES (?, ?, ?, ?, ?)',
      [id, username, password, token, isAdmin ? 1 : 0], // Use a variável 'id' gerada anteriormente
      function (error: any) {
        if (error) {
          return res.status(500).json({ message: 'Erro ao registrar usuário.' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso.' });
      }
    );
  });
};
