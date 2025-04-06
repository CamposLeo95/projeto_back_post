import type { ILikeInputDTO } from "../../../app/like/dtos/like.dto";
import type { LikeRepository } from "../../../app/like/repositories/like.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class FindOnlyLikeUseCase {
	constructor(private repo: LikeRepository) {}

	async execute(likeInputDTO: ILikeInputDTO) {
		try {
			const { id_post, id_user } = likeInputDTO;
			if (!id_post) throw new AppError("O ID do post é obrigatorio!", 400);
			if (!id_user) throw new AppError("O ID do usuario  é obrigatorio!", 400);

			return await this.repo.findOnlyLike(likeInputDTO);
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
