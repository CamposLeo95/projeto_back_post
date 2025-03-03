import type { UserRepository } from "../../../app/user/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/AppError";

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
