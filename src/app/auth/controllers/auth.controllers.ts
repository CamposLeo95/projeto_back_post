import type { NextFunction, Request, Response } from "express";
import type { AuthWithEmailUseCase } from "../../../domain/useCases/auth/auth-email.usecase";

export class AuthController {
	constructor(private authWithEmailUseCase: AuthWithEmailUseCase) {}

	async authWithEmailController(
		req: Request,
		res: Response,
		next: NextFunction,
	) {
		try {
			const data = req.body;
			const loginDTO = {
				email: data.email,
				password: data.password,
			};

			const response = await this.authWithEmailUseCase.execute(loginDTO);

			return res.status(200).json({ ...response });
		} catch (error) {
			next(error);
		}
	}
}
