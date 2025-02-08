import type { Request, Response } from "express";
import type { ResponseServiceType } from "../../types/response.type";
import type { IFindByPostId, ILikeDTO } from "./like.dto";
import type { ILikeModel } from "./like.model";

export interface ILikeRepository {
	findAllByPostId(likeDTO: IFindByPostId): Promise<ILikeModel[] | null>;
	findOnly(likeDTO: ILikeDTO): Promise<ILikeModel | null>;
	create(likeDTO: ILikeDTO): Promise<ILikeModel | null>;
	delete(likeDTO: ILikeDTO): Promise<void>;
}

export interface ILikeService {
	findAllByPostId(
		likeDTO: IFindByPostId,
	): Promise<ResponseServiceType<ILikeModel[]>>;
	findOnly(likeDTO: ILikeDTO): Promise<ResponseServiceType<ILikeModel>>;
	toggleLike(likeDTO: ILikeDTO): Promise<ResponseServiceType<null>>;
}

export interface ILikeController {
	findAllByPostId(req: Request, res: Response): Promise<Response>;
	findOnly(req: Request, res: Response): Promise<Response>;
	toggleLike(req: Request, res: Response): Promise<Response>;
}
