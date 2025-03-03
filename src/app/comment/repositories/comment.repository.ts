import type { Comment } from "../../../domain/entities/comment/comment.entity";
import type {
	ICommentCreateInputDTO,
	ICommentDeleteInputDTO,
	ICommentFindByPostIdInputDTO,
	ICommentUpdateInputDTO,
} from "../dtos/comment.dto";

export abstract class CommentRepository {
	abstract create(dataDTO: ICommentCreateInputDTO): Promise<void>;
	abstract update(dataDTO: ICommentUpdateInputDTO): Promise<void>;
	abstract delete(dataDTO: ICommentDeleteInputDTO): Promise<void>;
	abstract findCommentsByPostId(
		dataDTO: ICommentFindByPostIdInputDTO,
	): Promise<Comment[]>;
}
