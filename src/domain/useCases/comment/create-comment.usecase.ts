import type { ICommentCreateInputDTO } from "../../../app/comment/dtos/comment.dto";
import type { CommentRepository } from "../../../app/comment/repositories/comment.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class CreateCommentUseCase {
	constructor(private repo: CommentRepository) {}

	async execute(dataDTO: ICommentCreateInputDTO) {
		try {
			const { content } = dataDTO;
			if (!content) {
				throw new AppError("Conteudo é obrigatório", 400);
			}
			await this.repo.create(dataDTO);
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno do servidor", 500);
		}
	}
}
