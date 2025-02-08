import { PrismaClient } from "@prisma/client";
import type { ILikeDTO } from "./like.dto";
import type { ILikeRepository } from "./like.interface";
import type { ILikeModel } from "./like.model";

class LikeRepository implements ILikeRepository {
	private prisma = new PrismaClient();

	async findOnly(likeDTO: ILikeDTO) {
		try {
			return await this.prisma.like.findUnique({
				where: {
					id_post_id_user: likeDTO,
				},
			});
		} catch (error) {
			console.error("Erro ao buscar like no banco de dados", likeDTO);
			return null;
		}
	}

	async create(likeDTO: ILikeDTO) {
		try {
			return await this.prisma.like.create({ data: likeDTO });
		} catch (error) {
			console.error("like", "Erro ao criar like no banco de dados", likeDTO);
			return null;
		}
	}

	async delete(likeDTO: ILikeDTO) {
		try {
			await this.prisma.like.delete({
				where: { id_post_id_user: likeDTO },
			});
		} catch (error) {
			console.error("like", "Erro ao deletar like no banco de dados", likeDTO);
		}
	}

	async findAllByPostId(likeDTO: ILikeDTO) {
		try {
			const { id_post } = likeDTO;
			return await this.prisma.like.findMany({
				where: { id_post },
			});
		} catch {
			console.error("Erro ao buscar likes no banco de dados", likeDTO);
			return null;
		}
	}
}

export { LikeRepository };
