import type { ILikesInputByPost } from "../../../app/like/dtos/like.dto";
import type { LikeRepository } from "../../../app/like/repositories/like.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class FindAllLikesByPostIdUseCase {
	constructor(private repo: LikeRepository) {}

	async execute(likeInputDTO: ILikesInputByPost) {
		try {
			const { id_post } = likeInputDTO;
			if (!id_post) throw new AppError("O ID do post é obrigatorio!", 400);
			const response = await this.repo.findAllLikesByPostId(likeInputDTO);
			return response;
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
