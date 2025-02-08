import { AppError } from "../../../../exceptions/AppError";
import { hashPassword } from "../../../../utils/bcryptPassword";
import type { IUserCreateDTO } from "../../dtos/user.dto";
import { User } from "../../entities/user.entity";
import type { UserRepository } from "../../repositories/user.repository";

export class CreateUserUseCase {
	constructor(private userRepo: UserRepository) {}
	async execute({ password, ...userDTO }: IUserCreateDTO): Promise<User> {
		try {
			const passwordHash = await hashPassword(password);
			const user = new User({
				id: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				password: passwordHash,
				admin: false,
				name: userDTO.name,
				email: userDTO.email,
				image_perfil: userDTO.image_perfil,
				image_cover: userDTO.image_cover,
				bio: userDTO.bio,
			});

			const res = await this.userRepo.create(user);
			if (!res) throw new AppError("Error creating user", 500);
			return res;
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
