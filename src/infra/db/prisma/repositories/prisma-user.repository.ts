import type { PrismaClient } from "@prisma/client";
import { AppError } from "../../../../exceptions/AppError";
import type { User } from "../../../../modules/user/entities/user.entity";
import type { UserRepository } from "../../../../modules/user/repositories/user.repository";
import { PrismaUserMapper } from "../mappers/prisma-user.mapper";

export class PrismaUserRepository implements UserRepository {
	constructor(private prisma: PrismaClient) {}

	async findAll(): Promise<User[] | null> {
		const users = await this.prisma.user.findMany();
		if (!users) throw new AppError("Nenhum usuário encontrado", 404);
		return users.map(PrismaUserMapper.toDomain);
	}
	async findById(id: number): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { id },
		});
		if (!user) throw new AppError("Usuário não encontrado", 404);
		return PrismaUserMapper.toDomain(user);
	}
	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: { email },
		});
		if (!user) throw new AppError("Usuário não encontrado", 404);
		return PrismaUserMapper.toDomain(user);
	}
	async create(user: User): Promise<User> {
		const userRaw = PrismaUserMapper.toPrisma(user);

		const isExistUser = await this.prisma.user.findUnique({
			where: { email: user.getEmail },
		});
		if (isExistUser) throw new AppError("Email já cadastrado", 400);

		const res = await this.prisma.user.create({
			data: userRaw,
		});

		if (!res) throw new AppError("Erro ao criar usuário no banco", 500);

		return PrismaUserMapper.toDomain(res);
	}

	async update(user: User): Promise<User> {
		const userRaw = PrismaUserMapper.toPrisma(user);
		const isExistUser = await this.prisma.user.findUnique({
			where: { email: user.getEmail },
		});
		if (!isExistUser) throw new AppError("Usuário não encontrado", 404);
		const res = await this.prisma.user.update({
			where: { id: user.getId },
			data: userRaw,
		});
		if (!res) throw new AppError("Erro ao atualizar usuário no banco", 500);
		return PrismaUserMapper.toDomain(res);
	}

	async delete(id: number): Promise<void> {
		const isExistUser = await this.prisma.user.findUnique({
			where: { id },
		});
		if (!isExistUser) throw new AppError("Usuário não encontrado", 404);
		await this.prisma.user.delete({
			where: { id },
		});
	}
}
