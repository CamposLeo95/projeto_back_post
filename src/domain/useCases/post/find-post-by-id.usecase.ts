import type { IFindByIdPostDTO } from "../../../app/post/dtos/post.dto";
import type { PostRepository } from "../../../app/post/repositories/post.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class FindPostByID {
	constructor(private postRepo: PostRepository) {}

	async execute(dataPostDTO: IFindByIdPostDTO) {
		try {
			if (!dataPostDTO.id) {
				throw new AppError("ID do post é obrigatório", 400);
			}
			const res = await this.postRepo.findById({
				id: dataPostDTO.id,
			});
			return res;
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno no servidor", 500);
		}
	}
}
