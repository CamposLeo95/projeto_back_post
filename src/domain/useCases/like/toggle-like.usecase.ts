import type { ILikeInputDTO } from "../../../app/like/dtos/like.dto";
import type { LikeRepository } from "../../../app/like/repositories/like.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class ToggleLikeUseCase {
	constructor(private repo: LikeRepository) {}

	async execute(likeInputDTO: ILikeInputDTO) {
		try {
			const res = await this.repo.findOnlyLike(likeInputDTO);
			if (res) await this.repo.delete(likeInputDTO);

			if (!res) await this.repo.create(likeInputDTO);
		} catch (error) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno do servidor", 500);
		}
	}
}
