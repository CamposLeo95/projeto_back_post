import type { IUserInputCreateDTO } from "src/app/user/dtos/user.dto";
import type { UserRepository } from "../../../app/user/repositories/user.repository";
import { AppError } from "../../../shared/exceptions/AppError";

import { hashPassword } from "../../../shared/utils/bcryptPassword";

export class CreateUserUseCase {
	constructor(private userRepo: UserRepository) {}
	async execute({ password, ...userDTO }: IUserInputCreateDTO): Promise<void> {
		try {
			const passwordHash = await hashPassword(password);
			const user = {
				...userDTO,
				password: passwordHash,
			};
			await this.userRepo.create(user);
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
