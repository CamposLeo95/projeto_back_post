import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import type { LoginService } from "./login.service";

interface AuthRequest extends Request {
	userId?: string | JwtPayload;
}
export class LoginController {
	private loginService: LoginService;

	constructor(loginService: LoginService) {
		this.loginService = loginService;
	}

	async login(req: Request, res: Response) {
		try {
			const data = req.body;
			const loginDTO = {
				email: data.email,
				password: data.password,
			};

			const { status, message, token, id } =
				await this.loginService.login(loginDTO);

			if (status !== 200) {
				return res.status(status).json({ message });
			}

			return res.status(status).json({ message, token, id });
		} catch (error) {
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async verifyToken(req: AuthRequest, res: Response, next: () => void) {
		try {
			const token = req.headers.authorization?.split(" ")[1];

			if (!token) {
				return res.status(403).json({ message: "Token não fornecido" });
			}

			const { message, status, data } = await this.loginService.verifyToken({
				token,
			});
			if (!data) {
				return res.status(status).json({ message });
			}
			req.userId = data;
			next();
		} catch (error) {
			return res.status(500).json({ message: "Erro ao verificar token!" });
		}
	}
}
