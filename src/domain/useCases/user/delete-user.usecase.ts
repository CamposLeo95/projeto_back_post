import type { UserRepository } from "../../../app/user/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class DeleteUserUseCase {
	constructor(private userRepo: UserRepository) {}

	async execute(id: number) {
		try {
			await this.userRepo.delete(id);
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			new AppError("Erro interno no servidor", 500);
		}
	}
}
