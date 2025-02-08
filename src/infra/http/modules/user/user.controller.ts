import type { Request, Response } from "express";
import {
	deleteUsersFromGCS,
	uploadUsersToGCS,
} from "../../../../config/uploads";
import { AppError } from "../../../../exceptions/AppError";
import type {
	IUserCreateDTO,
	IUserUpdateDTO,
} from "../../../../modules/user/dtos/user.dto";
import type { CreateUserUseCase } from "../../../../modules/user/useCases/createUser/create-user.usecase";
import type { DeleteUserUseCase } from "../../../../modules/user/useCases/deleteUser/delete-user.usecase";
import type { FindAllUserUseCase } from "../../../../modules/user/useCases/findAllUser/find-all-user.usecase";
import type { FindUserByIdUseCase } from "../../../../modules/user/useCases/findUserById/find-user-by-id.usecase";
import type { UpdateUserUseCase } from "../../../../modules/user/useCases/updateUser/update-user";

export class UsersControllers {
	constructor(
		private findAllUser: FindAllUserUseCase,
		private findUsersByID: FindUserByIdUseCase,
		private createUser: CreateUserUseCase,
		private updateUser: UpdateUserUseCase,
		private deleteUser: DeleteUserUseCase,
	) {}

	async findAllUsers(_: Request, res: Response) {
		try {
			const users = await this.findAllUser.execute();
			return res.status(200).json({ data: users });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					status: error.statusCode,
					message: error.message,
				});
			}
			return res
				.status(500)
				.json({ message: "Erro interno no servidor", error });
		}
	}

	async findUsersById(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const user = await this.findUsersByID.execute(id);
			return res.status(200).json({ data: user });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					message: error.message,
					status: error.statusCode,
				});
			}
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async create(req: Request, res: Response) {
		try {
			const body: IUserCreateDTO = req.body;
			const files = req.files;
			const imageUserFile = files["perfil"]?.[0];
			const imageCoverFile = files["cover"]?.[0];

			const imageUserPath =
				(await uploadUsersToGCS(imageUserFile, "users")) || "";
			const imageCoverPath =
				(await uploadUsersToGCS(imageCoverFile, "users")) || "";

			const userCreateDTO: IUserCreateDTO = {
				name: body.name,
				email: body.email,
				admin: !!body.admin,
				password: body.password,
				image_perfil: imageUserPath,
				image_cover: imageCoverPath,
				bio: body.bio,
			};
			const user = await this.createUser.execute(userCreateDTO);

			if (!user.getId) {
				await deleteUsersFromGCS(imageUserPath);
				await deleteUsersFromGCS(imageCoverPath);
				return res.status(500).json({ message: "Erro ao criar usuario" });
			}

			return res
				.status(201)
				.json({ message: "Usuario criado com sucesso", data: user });
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					status: error.statusCode,
					message: error.message,
				});
			}
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async update(req: Request, res: Response) {
		try {
			const idUser = Number(req.params.id);
			const body = req.body;
			const files = req.files;
			console.log("files", files);
			const imageUserFile = files["perfil"]?.[0];
			const imageCoverFile = files["cover"]?.[0];

			const imageUserPath =
				(await uploadUsersToGCS(imageUserFile, "users")) || "";
			const imageCoverPath =
				(await uploadUsersToGCS(imageCoverFile, "users")) || "";

			const userUpdateDTO: IUserUpdateDTO = {
				id: idUser,
				name: body.name,
				email: body.email,
				admin: !!body.admin,
				password: body.password,
				image_perfil: imageUserPath,
				image_cover: imageCoverPath,
				bio: body.bio,
			};

			const user = await this.updateUser.execute(userUpdateDTO);

			if (!user) {
				await deleteUsersFromGCS(imageUserPath);
				await deleteUsersFromGCS(imageCoverPath);
				return res.status(500).json({ message: "Erro ao atualizar usuario" });
			}

			return res
				.status(200)
				.json({ message: "Usuario atualizado com sucesso", data: user });
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					status: error.statusCode,
					message: error.message,
				});
			}
			return res.status(500).json({ message: "error interno", error });
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const userId = Number(req.params.id);
			await this.deleteUser.execute(userId);
			return res.status(200).json({ message: "Usuario deletado com sucesso!" });
		} catch (error: unknown) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					status: error.statusCode,
					message: error.message,
				});
			}
			return res.status(500).json({ message: "error interno", error });
		}
	}
}
