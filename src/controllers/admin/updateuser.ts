import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
import { User } from '../../model/user.model';

const db = new sqlite3.Database('database.db');

export const updateuser = (req: Request & { user: User }, res: Response) => {
  const { id } = req.params; // Extraímos o ID do parâmetro de rota
  const { newPassword } = req.body;

  db.run('UPDATE users SET password = ? WHERE id = ?', [newPassword, id], (error) => {
    if (error) {
      console.error('Erro ao atualizar a senha do usuário:', error); // Log de erro no console

      if (error.message.includes('no such table')) {
        return res.status(500).json({ message: 'Erro no banco de dados: tabela "users" não encontrada.' });
      }

      if (error.message.includes('no column named')) {
        return res.status(500).json({ message: 'Erro no banco de dados: coluna "senha" não encontrada na tabela "users".' });
      }

      return res.status(500).json({ message: 'Erro ao atualizar a senha do usuário.' });
    }

    res.json({ message: 'Senha do usuário atualizada com sucesso.' });
  });
};
