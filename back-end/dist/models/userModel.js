"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.createUser = void 0;
const edge_1 = require("../../src/generated/client/edge");
const prisma = new edge_1.PrismaClient();
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.createUser = createUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.getUserById = getUserById;
