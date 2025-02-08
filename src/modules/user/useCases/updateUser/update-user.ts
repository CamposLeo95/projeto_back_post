import { AppError } from "../../../../exceptions/AppError";
import type { IUserUpdateDTO } from "../../dtos/user.dto";
import { User } from "../../entities/user.entity";
import type { UserRepository } from "../../repositories/user.repository";

export class UpdateUserUseCase {
	constructor(private useRepo: UserRepository) {}

	async execute(updateUserDTO: IUserUpdateDTO) {
		try {
			const userExists = await this.useRepo.findById(updateUserDTO.id);
			if (!userExists) {
				throw new AppError("usuario não encontrado", 404);
			}

			const user = new User({
				...updateUserDTO,
				id: userExists.getId,
				createdAt: userExists.getCreatedAt,
				updatedAt: userExists.getUpdatedAt,
				email: updateUserDTO.email || userExists.getEmail,
				name: updateUserDTO.name || userExists.getName,
				password: updateUserDTO.password || userExists.getPassword,
				image_perfil:
					updateUserDTO.image_perfil || userExists.getImage_perfil || "",
				image_cover:
					updateUserDTO.image_cover || userExists.getImage_cover || "",
				bio: updateUserDTO.bio || userExists.getBio || "",
			});

			const updatedUser = await this.useRepo.update(user);
			return updatedUser;
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
