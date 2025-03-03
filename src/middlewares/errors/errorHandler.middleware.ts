import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../shared/exceptions/AppError";

export function errorHandler(
	error: AppError,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	if (error instanceof AppError) {
		return res.status(error.statusCode).json({ message: error.message });
	}

	return res.status(500).json({ message: "Erro interno do servidor" });
}
