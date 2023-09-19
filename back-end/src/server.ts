import express, { Request, Response } from 'express';  
import { PrismaClient } from './generated/client/edge';

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota para buscar todos os usuários
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Rota para criar um novo usuário
app.post('/users', async (req: Request, res: Response) => {
  const { name, email, cnpj, companyName, employeesCLT, password, socialCapital, employeesOutsourced } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        cnpj,
        companyName,
        employeesCLT,
        password,
        socialCapital,
        employeesOutsourced
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escutando na porta ${port}`);
});
