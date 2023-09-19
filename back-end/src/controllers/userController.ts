import { Request, Response } from 'express';
import * as UserModel from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, senha, cnpj, socialCapital, employeesCLT, employeesOutsourced, partners, companyName } = req.body;
const user = await UserModel.createUser({ 
  name,
  email,
  senha,
  cnpj,
  companyName, 
  socialCapital,
  employeesCLT,
  employeesOutsourced,
  partners, 
});

    res.json(user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const user = await UserModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};

