import { AppError } from "../../../../exceptions/AppError";
import type { UserRepository } from "../../repositories/user.repository";

export class FindUserByIdUseCase {
	constructor(private userRepo: UserRepository) {}

	async execute(id: number) {
		try {
			const user = await this.userRepo.findById(id);
			return user;
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro  interno do servidor", 500);
		}
	}
}
