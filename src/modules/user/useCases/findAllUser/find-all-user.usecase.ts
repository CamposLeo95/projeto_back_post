import { AppError } from "../../../../exceptions/AppError";
import type { UserRepository } from "../../repositories/user.repository";

export class FindAllUserUseCase {
	constructor(private userRepo: UserRepository) {}

	execute() {
		try {
			const users = this.userRepo.findAll();
			return users;
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
