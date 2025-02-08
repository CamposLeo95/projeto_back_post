import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { PrismaUserRepository } from "../../infra/db/prisma/repositories/prisma-user.repository";
import type { ILoginDTO, IVerifyDTO } from "./login.dto";
import type { ILoginService } from "./login.interface";

export class LoginService implements ILoginService {
	private chaveSecreta = process.env.JWT_SECRET || "chave_padrao_secreta";

	constructor(private userRepository: PrismaUserRepository) {}

	async login(loginDTO: ILoginDTO) {
		try {
			const { email, password } = loginDTO;

			const user = await this.userRepository.findByEmail(email);

			if (user && (await bcrypt.compare(password, user.getPassword))) {
				const token = jwt.sign({ userId: user.getId }, this.chaveSecreta, {
					expiresIn: "8h",
				});
				return {
					status: 200,
					message: "Login feito com sucesso",
					token,
					id: user.getId,
				};
			}

			return { status: 401, message: "Credenciais inválidas" };
		} catch (error) {
			return { status: 500, message: "Erro ao fazer login" };
		}
	}

	async verifyToken(verifyDTO: IVerifyDTO) {
		try {
			const { token } = verifyDTO;

			if (!token) {
				return { status: 403, message: "Token não fornecido", data: null };
			}

			const { status, message, data } = jwt.verify(
				token,
				this.chaveSecreta,
				(err, decode) => {
					if (err || !decode) {
						return { status: 401, message: "Token invalido!", data: null };
					}
					return { status: 200, message: "Token valido", data: decode };
				},
			);
			return { status, message, data };
		} catch (error) {
			return { status: 500, message: "Erro ao verificar token!!", data: null };
		}
	}
}
