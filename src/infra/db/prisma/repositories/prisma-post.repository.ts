import type { PrismaClient } from "@prisma/client";
import type {
	ICreatePostDTO,
	IDeletePostDTO,
	IFindAllByUserPostDTO,
	IFindByIdPostDTO,
	IUpdatePostDTO,
} from "../../../../app/post/dtos/post.dto";

import type { PostRepository } from "../../../../app/post/repositories/post.repository";
import type { Post } from "../../../../domain/entities/post/post.entity";
import { AppError } from "../../../../shared/exceptions/AppError";
import { PrismaPostMapper } from "../mappers/prisma-post.mapper";

export class PrismaPostRepository implements PostRepository {
	constructor(private client: PrismaClient) {}

	async create(dataInputDTO: ICreatePostDTO): Promise<void> {
		try {
			await this.client.post.create({ data: dataInputDTO });
		} catch (error) {
			throw new Error(`${error}`);
		}
	}
	async update(dataInputDTO: IUpdatePostDTO): Promise<void> {
		try {
			const { id, ...data } = dataInputDTO;
			await this.client.post.update({
				where: { id },
				data,
			});
		} catch (error) {
			throw new Error(`${error}`);
		}
	}
	async delete(dataInputDTO: IDeletePostDTO): Promise<void> {
		try {
			const { id } = dataInputDTO;
			await this.client.post.delete({
				where: { id },
			});
		} catch (error) {
			throw new Error(`${error}`);
		}
	}
	async findAll(): Promise<Post[]> {
		try {
			const rawPosts = await this.client.post.findMany({
				orderBy: { created_at: "desc" },
			});
			if (!rawPosts) throw new AppError("Nenhum post encontrado", 404);
			return rawPosts.map((post) => PrismaPostMapper.toDomain(post));
		} catch (error) {
			throw new Error(`${error}`);
		}
	}
	async findById(dataInputDTO: IFindByIdPostDTO): Promise<Post> {
		try {
			const { id } = dataInputDTO;
			const post = await this.client.post.findUnique({
				where: { id },
			});
			if (!post) throw new AppError("Post nao encontrado", 404);
			return PrismaPostMapper.toDomain(post);
		} catch (error) {
			throw new Error(`${error}`);
		}
	}
	async findAllByUserPost(
		dataInputDTO: IFindAllByUserPostDTO,
	): Promise<Post[]> {
		try {
			const { id_user } = dataInputDTO;
			const posts = await this.client.post.findMany({
				where: { id_user },
			});
			if (!posts.length) throw new AppError("Nenhum post encontrado", 404);
			return posts.map(PrismaPostMapper.toDomain);
		} catch (error) {
			throw new Error(`${error}`);
		}
	}
}
