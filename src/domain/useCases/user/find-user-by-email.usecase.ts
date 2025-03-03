import type { UserRepository } from "../../../app/user/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/AppError";

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
