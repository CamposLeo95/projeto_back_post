import type { PrismaClient } from "@prisma/client";
import type {
	IUserInputCreateDTO,
	IUserInputUpdateDTO,
} from "../../../../app/user/dtos/user.dto";

import type { UserRepository } from "../../../../app/user/repositories/user.repository";
import { User } from "../../../../domain/entities/user/user.entity";
import { AppError } from "../../../../shared/exceptions/AppError";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";

export class PrismaUserRepository implements UserRepository {
	constructor(private client: PrismaClient) {}

	async findAll() {
		try {
			const users = await this.client.user.findMany();
			return users.map(PrismaUserMapper.toDomain);
		} catch (error) {
			throw new AppError("Erro ao encontrar Usuarios", 500);
		}
	}
	async findById(id: number) {
		try {
			const user = await this.client.user.findUnique({
				where: { id },
			});
			if (!user) throw new AppError("Usuário não encontrado", 404);
			return PrismaUserMapper.toDomain(user);
		} catch (error) {
			throw new AppError("Erro ao encontrar Usuarios", 500);
		}
	}
	async findByEmail(email: string) {
		try {
			const user = await this.client.user.findUnique({
				where: { email },
			});
			if (!user) throw new AppError("Usuário não encontrado", 404);
			return PrismaUserMapper.toDomain(user);
		} catch (error) {
			throw new AppError("Erro ao encontrar Usuarios", 500);
		}
	}
	async create(userDTO: IUserInputCreateDTO) {
		try {
			const user = new User({
				id: 0,
				createdAt: new Date(),
				updatedAt: new Date(),
				...userDTO,
			});
			const userRaw = PrismaUserMapper.toPrisma(user);
			const isExistUser = await this.client.user.findUnique({
				where: { email: user.getEmail },
			});
			if (isExistUser) throw new AppError("Email já cadastrado", 400);
			const res = await this.client.user.create({
				data: userRaw,
			});
			if (!res) throw new AppError("Erro ao criar usuário no banco", 500);
		} catch (error) {
			throw new AppError("Erro interno ao criar Usuarios", 500);
		}
	}

	async update(userDTO: IUserInputUpdateDTO) {
		try {
			const userExists = await this.client.user.findUnique({
				where: { email: userDTO.email },
			});

			if (!userExists) {
				throw new AppError("usuario não encontrado", 404);
			}

			const user = new User({
				id: userDTO.id,
				createdAt: userExists.createdAt,
				updatedAt: userExists.updatedAt,
				email: userDTO.email || userExists.email,
				name: userDTO.name || userExists.name,
				password: userDTO.password || userExists.password,
				image_perfil: userDTO.image_perfil || userExists.image_perfil || "",
				image_cover: userDTO.image_cover || userExists.image_cover || "",
				bio: userDTO.bio || userExists.bio || "",
			});

			const userRaw = PrismaUserMapper.toPrisma(user);

			const res = await this.client.user.update({
				where: { id: user.getId },
				data: userRaw,
			});
			if (!res) throw new AppError("Erro ao atualizar usuário no banco", 500);
		} catch (error) {
			throw new AppError("Erro interno ao atualizar Usuarios", 500);
		}
	}

	async delete(id: number): Promise<void> {
		try {
			const isExistUser = await this.client.user.findUnique({
				where: { id },
			});
			if (!isExistUser) throw new AppError("Usuário não encontrado", 404);
			await this.client.user.delete({
				where: { id },
			});
		} catch (error) {
			throw new AppError("Erro interno ao deletar usuario", 500);
		}
	}
}
