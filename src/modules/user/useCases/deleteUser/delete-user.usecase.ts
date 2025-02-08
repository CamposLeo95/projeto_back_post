import { AppError } from "../../../../exceptions/AppError";
import type { UserRepository } from "../../repositories/user.repository";

export class DeleteUserUseCase {
	constructor(private userRepo: UserRepository) {}

	async execute(id: number) {
		try {
			const user = await this.userRepo.findById(id);
			if (!user) {
				return false;
			}
			await this.userRepo.delete(id);
			return true;
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
