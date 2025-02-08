import { AppError } from "../../../../exceptions/AppError";
import type { UserRepository } from "../../repositories/user.repository";

export class FindUserByEmailUseCase {
	constructor(private userRepo: UserRepository) {}

	async execute(email: string) {
		try {
			const user = await this.userRepo.findByEmail(email);
			return user;
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new Error("Erro interno do servidor");
		}
	}
}
