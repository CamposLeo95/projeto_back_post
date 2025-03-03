import type { IDeletePostDTO } from "../../../app/post/dtos/post.dto";
import type { PostRepository } from "../../../app/post/repositories/post.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class DeletePostUseCase {
	constructor(private postRepo: PostRepository) {}

	async execute(dataPostDTO: IDeletePostDTO) {
		try {
			await this.postRepo.delete(dataPostDTO);
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Error interno no servidor", 500);
		}
	}
}
