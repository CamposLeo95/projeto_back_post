import type { ICommentUpdateInputDTO } from "../../../app/comment/dtos/comment.dto";
import type { CommentRepository } from "../../../app/comment/repositories/comment.repository";
import { AppError } from "../../../shared/exceptions/AppError";

export class UpdateCommentUseCase {
	constructor(private repo: CommentRepository) {}
	async execute(dataDTO: ICommentUpdateInputDTO) {
		try {
			if (!dataDTO.content) {
				return { status: 403, message: "Conteudo vazio" };
			}
			await this.repo.update(dataDTO);
		} catch (error: unknown) {
			if (error instanceof AppError) throw Error;
			throw new AppError("Erro interno do servidor", 500);
		}
	}
}
