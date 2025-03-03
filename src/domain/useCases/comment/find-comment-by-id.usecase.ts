import type { ICommentFindByPostIdInputDTO } from "../../../app/comment/dtos/comment.dto";
import type { CommentRepository } from "../../../app/comment/repositories/comment.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class FindCommentByPostIdUseCase {
	constructor(private repo: CommentRepository) {}

	async execute(dataDTO: ICommentFindByPostIdInputDTO) {
		try {
			const comments = await this.repo.findCommentsByPostId(dataDTO);
			return comments;
		} catch (error: unknown) {
			if (error instanceof AppError) throw error;
			throw new AppError("Erro interno do servidor!", 500);
		}
	}
}
