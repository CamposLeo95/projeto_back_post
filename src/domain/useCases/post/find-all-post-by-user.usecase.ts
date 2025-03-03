import type { IFindAllByUserPostDTO } from "../../../app/post/dtos/post.dto";
import type { PostRepository } from "../../../app/post/repositories/post.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class FindAllByUserPostUseCase {
	constructor(private postRepo: PostRepository) {}

	async execute(dataPostDTO: IFindAllByUserPostDTO) {
		try {
			if (!dataPostDTO.id_user) {
				throw new AppError("ID do usuário é obrigatório", 400);
			}
			const post = await this.postRepo.findAllByUserPost(dataPostDTO);
			return post;
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
