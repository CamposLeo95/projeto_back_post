import type { Request, Response } from "express";
import type { ResponseServiceType } from "../../types/response.type";
import type {
	ICommentCreateDTO,
	ICommentDeleteDTO,
	ICommentFindByPostIdDTO,
	ICommentUpdateDTO,
} from "./comment.dto";
import type { ICommentModel } from "./comment.model";

export interface ICommentRepository {
	create(commentCreateDTO: ICommentCreateDTO): Promise<ICommentModel | null>;
	update: (
		commentUpdateDTO: ICommentUpdateDTO,
	) => Promise<ICommentModel | null>;
	delete: (commentDeleteDTO: ICommentDeleteDTO) => Promise<void>;
	findByPostId: (
		commentByPostIdDTO: ICommentFindByPostIdDTO,
	) => Promise<ICommentModel[] | null>;
}

export interface ICommentService {
	create(
		commentCreateDTO: ICommentCreateDTO,
	): Promise<ResponseServiceType<ICommentModel> | null>;
	update(
		commentUpdateDTO: ICommentUpdateDTO,
	): Promise<ResponseServiceType<ICommentModel> | null>;
	delete(
		commentDeleteDTO: ICommentDeleteDTO,
	): Promise<ResponseServiceType<null> | null>;
	findByPostId(
		commentByPostIdDTO: ICommentFindByPostIdDTO,
	): Promise<ResponseServiceType<ICommentModel[]> | null>;
}

export interface ICommentController {
	create(req: Request, res: Response): Promise<Response>;
	update(req: Request, res: Response): Promise<Response>;
	delete(req: Request, res: Response): Promise<Response>;
	findByPostId(req: Request, res: Response): Promise<Response>;
}
