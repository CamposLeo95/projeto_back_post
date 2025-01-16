import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface AuthRequest extends Request {
	userId?: string | JwtPayload;
}

const prisma = new PrismaClient();
const chaveSecreta = process.env.JWT_SECRET || "chave_padrao_secreta";

export async function login(req: Request, res: Response) {
	try {
		const { email, senha } = req.body;

		const user = await prisma.user.findUnique({ where: { email } });

		if (user && (await bcrypt.compare(senha, user.senha))) {
			const token = jwt.sign({ userId: user.id }, chaveSecreta, {
				expiresIn: "8h",
			});
			return res.status(200).json({ token, id: user.id });
		}

		return res.status(401).json({ message: "Credenciais inválidas" });
	} catch (error) {
		throw new Error(`Erro ao fazer login ${error}`);
	}
}

export async function verifyToken(
	req: AuthRequest,
	res: Response,
	next: () => void,
) {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		return res.status(403).json({ message: "Token não fornecido" });
	}

	jwt.verify(token, chaveSecreta, (err, decode) => {
		if (err || !decode) {
			return res.status(401).json({ message: "Token invalido" });
		}
		req.userId = decode;

		next();
	});
}
