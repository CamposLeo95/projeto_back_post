import type { UserRepository } from "../../../app/user/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/AppError";

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
