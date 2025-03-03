import type { IUserUpdateDTO } from "../../../app/user/dtos/user.dto";
import type { UserRepository } from "../../../app/user/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class UpdateUserUseCase {
	constructor(private useRepo: UserRepository) {}

	async execute(updateUserDTO: IUserUpdateDTO) {
		try {
			await this.useRepo.update(updateUserDTO);
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
