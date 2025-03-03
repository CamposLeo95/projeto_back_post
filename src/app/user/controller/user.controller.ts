import type { NextFunction, Request, Response } from "express";
import type { CreateUserUseCase } from "../../../domain/useCases/user/create-user.usecase";
import type { DeleteUserUseCase } from "../../../domain/useCases/user/delete-user.usecase";
import type { FindAllUserUseCase } from "../../../domain/useCases/user/find-all-user.usecase";
import type { FindUserByIdUseCase } from "../../../domain/useCases/user/find-user-by-id.usecase";
import type { UpdateUserUseCase } from "../../../domain/useCases/user/update-user";
import { AppError } from "../../../shared/exceptions/AppError";

import {
	deleteUsersFromGCS,
	uploadUsersToGCS,
} from "../../../infra/config/gcp/uploads";
import type {
	IUserInputCreateDTO,
	IUserInputUpdateDTO,
} from "../dtos/user.dto";

export class UsersControllers {
	constructor(
		private findAllUser: FindAllUserUseCase,
		private findUsersByID: FindUserByIdUseCase,
		private createUser: CreateUserUseCase,
		private updateUser: UpdateUserUseCase,
		private deleteUser: DeleteUserUseCase,
	) {}

	async findAllUsers(_: Request, res: Response, next: NextFunction) {
		try {
			const users = await this.findAllUser.execute();
			return res.status(200).json({ data: users });
		} catch (error) {
			next(error);
		}
	}

	async findUsersById(req: Request, res: Response, next: NextFunction) {
		try {
			const id = Number(req.params.id);
			const user = await this.findUsersByID.execute(id);
			return res.status(200).json({ data: user });
		} catch (error) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const files = req.files;
		const imageUserFile = files["perfil"]?.[0];
		const imageCoverFile = files["cover"]?.[0];

		const imageUserPath =
			(await uploadUsersToGCS(imageUserFile, "users")) || "";
		const imageCoverPath =
			(await uploadUsersToGCS(imageCoverFile, "users")) || "";

		try {
			const body: IUserInputCreateDTO = req.body;
			const userCreateDTO: IUserInputCreateDTO = {
				name: body.name,
				email: body.email,
				admin: !!body.admin,
				password: body.password,
				image_perfil: imageUserPath,
				image_cover: imageCoverPath,
				bio: body.bio,
			};
			await this.createUser.execute(userCreateDTO);

			return res.status(201).json({ message: "Usuario criado com sucesso" });
		} catch (error: unknown) {
			await deleteUsersFromGCS(imageUserPath);
			await deleteUsersFromGCS(imageCoverPath);
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const files = req.files;
		const imageUserFile = files["perfil"]?.[0];
		const imageCoverFile = files["cover"]?.[0];
		const imageUserPath =
			(await uploadUsersToGCS(imageUserFile, "users")) || "";
		const imageCoverPath =
			(await uploadUsersToGCS(imageCoverFile, "users")) || "";
		try {
			const idUser = Number(req.params.id);
			const body = req.body;

			const userUpdateDTO: IUserInputUpdateDTO = {
				id: idUser,
				name: body.name,
				email: body.email,
				admin: !!body.admin,
				password: body.password,
				image_perfil: imageUserPath,
				image_cover: imageCoverPath,
				bio: body.bio,
			};

			await this.updateUser.execute(userUpdateDTO);

			return res
				.status(200)
				.json({ message: "Usuario atualizado com sucesso" });
		} catch (error) {
			await deleteUsersFromGCS(imageUserPath);
			await deleteUsersFromGCS(imageCoverPath);
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = Number(req.params.id);
			await this.deleteUser.execute(userId);
			return res.status(200).json({ message: "Usuario deletado com sucesso!" });
		} catch (error: unknown) {
			next(error);
		}
	}
}
