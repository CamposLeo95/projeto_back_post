import type { IUpdatePostDTO } from "../../../app/post/dtos/post.dto";
import type { PostRepository } from "../../../app/post/repositories/post.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class UpdatePostUseCase {
	constructor(private postRepo: PostRepository) {}
	async execute(dataPostDTO: IUpdatePostDTO) {
		try {
			if (!dataPostDTO.id) {
				throw new AppError("ID do post é obrigatório", 400);
			}
			await this.postRepo.update(dataPostDTO);
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
