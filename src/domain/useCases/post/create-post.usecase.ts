import type { ICreatePostDTO } from "../../../app/post/dtos/post.dto";
import type { PostRepository } from "../../../app/post/repositories/post.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class CreatePostUseCase {
	constructor(private postRepo: PostRepository) {}

	async execute(dataPostDTO: ICreatePostDTO) {
		try {
			const { content } = dataPostDTO;
			if (!content) {
				throw new AppError("Conteúdo do post é obrigatório", 400);
			}
			await this.postRepo.create(dataPostDTO);
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
