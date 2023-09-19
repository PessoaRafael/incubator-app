"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const passport_1 = __importDefault(require("passport"));
const authenticate = (req, res, next) => {
    // Use o método `passport.authenticate` para verificar a autenticação do usuário
    passport_1.default.authenticate('local', { session: true }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Se a autenticação falhar
            return res.status(401).json({ error: 'Falha na autenticação' });
        }
        // Se a autenticação for bem-sucedida
        return next();
    })(req, res, next);
};
exports.authenticate = authenticate;
