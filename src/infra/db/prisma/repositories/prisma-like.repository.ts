import type { PrismaClient } from "@prisma/client";
import type { ILikeInputDTO } from "../../../../app/like/dtos/like.dto";
import type { LikeRepository } from "../../../../app/like/repositories/like.repository";

export class PrismaLikeRepository implements LikeRepository {
	constructor(private client: PrismaClient) {}

	async create(likeInputDTO: ILikeInputDTO) {
		try {
			await this.client.like.create({ data: likeInputDTO });
		} catch (error) {
			console.error(
				"like",
				"Erro ao criar like no banco de dados",
				likeInputDTO,
			);
			throw new Error(`${error}`);
		}
	}

	async delete(likeInputDTO: ILikeInputDTO) {
		try {
			await this.client.like.delete({
				where: {
					id_post_id_user: likeInputDTO,
				},
			});
		} catch (error) {
			console.error(
				"like",
				"Erro ao deletar like no banco de dados",
				likeInputDTO,
			);
			throw new Error(`${error}`);
		}
	}
	async findAllLikesByPostId(likeInputDTO: ILikeInputDTO) {
		try {
			const { id_post } = likeInputDTO;
			return await this.client.like.findMany({
				where: { id_post },
			});
		} catch (error) {
			console.error("Erro ao buscar likes no banco de dados", likeInputDTO);
			throw new Error(`${error}`);
		}
	}
	async findOnlyLike(likeInputDTO: ILikeInputDTO) {
		try {
			return await this.client.like.findUnique({
				where: {
					id_post_id_user: likeInputDTO,
				},
			});
		} catch (error) {
			console.error("Erro ao buscar like no banco de dados", likeInputDTO);
			throw new Error(`${error}`);
		}
	}
}
