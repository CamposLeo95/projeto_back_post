import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../shared/exceptions/AppError";

export class AuthMiddleware {
	private secret = process.env.JWT_SECRET || "chave_padrao_secreta";

	async authJwt(req: Request, _: Response, next: NextFunction) {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			if (!token) throw new AppError("Token não fornecido", 403);

			const decode = this.verifyToken(token, this.secret);
			req.user = decode;

			next();
		} catch (error) {
			next(error);
		}
	}

	private verifyToken(token: string, secretKey: string) {
		try {
			return jwt.verify(token, secretKey);
		} catch (err) {
			throw new AppError("Não Autorizado!", 401);
		}
	}
}
