import { PrismaClient } from "@prisma/client";
import type {
	ICreatePostDTO,
	IDeletePostDTO,
	IFindAllByUserPostDTO,
	IFindByIdPostDTO,
	IUpdatePostDTO,
} from "./post.dto";
import type { IPostRepository } from "./post.interface";

export class PostRepository implements IPostRepository {
	private prisma = new PrismaClient();

	async create(createPostDTO: ICreatePostDTO) {
		try {
			return await this.prisma.post.create({
				data: createPostDTO,
			});
		} catch (error) {
			return null;
		}
	}

	async update(updatePostDTO: IUpdatePostDTO) {
		try {
			const { id, ...data } = updatePostDTO;
			return await this.prisma.post.update({
				where: { id },
				data: data,
			});
		} catch (error) {
			return null;
		}
	}

	async delete(deletePostDTO: IDeletePostDTO) {
		try {
			const { id } = deletePostDTO;
			await this.prisma.post.delete({ where: { id } });
		} catch (error) {
			return;
		}
	}

	async findAll() {
		try {
			const posts = await this.prisma.post.findMany({
				orderBy: { created_at: "desc" },
			});
			console.log(posts);
			return posts;
		} catch (error) {
			return null;
		}
	}

	async findById(findByIdPostDTO: IFindByIdPostDTO) {
		try {
			const { id } = findByIdPostDTO;
			const post = await this.prisma.post.findUnique({ where: { id } });
			return post;
		} catch (error) {
			return null;
		}
	}

	async findAllByUserPost(findAllByUserPostDTO: IFindAllByUserPostDTO) {
		try {
			const { id_user } = findAllByUserPostDTO;
			return await this.prisma.post.findMany({ where: { id_user } });
		} catch (error) {
			return null;
		}
	}
}
