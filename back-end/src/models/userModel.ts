import { Partner, PrismaClient } from '../../src/generated/client/edge';

const prisma = new PrismaClient();

export const createUser = async (data: {
  name: string;
  email: string;
  senha: string;
  cnpj: string;
  companyName: string;
  socialCapital: number;
  employeesCLT: number;
  employeesOutsourced: number;
  partners: number;
}) => {
  return prisma.user.create({ 
    data: {
      name: data.name,
      email: data.email,
      password: data.senha,
      cnpj: data.cnpj,
      companyName: data.companyName,
      socialCapital: data.socialCapital,
      employeesCLT: data.employeesCLT,
      employeesOutsourced: data.employeesOutsourced,
      // Adicione outras propriedades que desejar
    },
    select: {
      // Especifique aqui os campos que deseja retornar
      id: true,
      name: true,
      email: true,
      // Adicione outros campos que desejar retornar
    },
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({ 
    where: {
      id,
    },
    select: {
      // Especifique aqui os campos que deseja retornar
      id: true,
      name: true,
      email: true,
      // Adicione outros campos que desejar retornar
    },
  });
};
