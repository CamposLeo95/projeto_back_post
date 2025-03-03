import type { PostRepository } from "../../../app/post/repositories/post.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class FindAllPostsUseCase {
	constructor(private postRepo: PostRepository) {}

	async execute() {
		try {
			const posts = await this.postRepo.findAll();
			return posts;
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
