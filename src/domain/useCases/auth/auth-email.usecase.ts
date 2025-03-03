import type { IAuthWithEmailDTO } from "../../../app/auth/dtos/auth.dtos";
import type { PrismaUserRepository } from "../../../infra/db/prisma/repositories/prisma-user.repository";
import { checkAuthWithEmail } from "../../../services/auth/auth-email.service";

import { AppError } from "../../../shared/exceptions/AppError";

export class AuthWithEmailUseCase {
	private chaveSecreta = process.env.JWT_SECRET || "chave_padrao_secreta";
	constructor(private repo: PrismaUserRepository) {}

	async execute(authDTO: IAuthWithEmailDTO) {
		try {
			const { email, password } = authDTO;

			const user = await this.repo.findByEmail(email);

			const res = await checkAuthWithEmail(user, password, this.chaveSecreta);
			if (res?.token && res?.id) {
				return { data: res };
			}

			throw new AppError("Usuario ou senha invalidos!", 401);
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro ao autenticar usuario", 500);
		}
	}
}
