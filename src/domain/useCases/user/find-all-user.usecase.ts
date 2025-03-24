import type { UserRepository } from "../../../app/user/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class FindAllUserUseCase {
	constructor(private userRepo: UserRepository) {}

	async execute() {
		try {
			return await this.userRepo.findAll();
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
