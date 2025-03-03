import type { ICommentDeleteInputDTO } from "../../../app/comment/dtos/comment.dto";
import type { CommentRepository } from "../../../app/comment/repositories/comment.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class DeleteCommentUseCase {
	constructor(private repo: CommentRepository) {}

	async execute(dataDTO: ICommentDeleteInputDTO) {
		try {
			await this.repo.delete(dataDTO);
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno do servidor", 500);
		}
	}
}
