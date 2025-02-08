import type { Request, Response } from "express";
import type { ResponseServiceType } from "../../types/response.type";
import type {
	ICreatePostDTO,
	IDeletePostDTO,
	IFindAllByUserPostDTO,
	IFindByIdPostDTO,
	IUpdatePostDTO,
} from "./post.dto";
import type { PostModel } from "./post.model";

export interface IPostRepository {
	create(createPostDTO: ICreatePostDTO): Promise<PostModel | null>;
	update(updatePostDTO: IUpdatePostDTO): Promise<PostModel | null>;
	delete(deletePostDTO: IDeletePostDTO): Promise<void>;
	findAll(): Promise<PostModel[] | null>;
	findById(findByIdPostDTO: IFindByIdPostDTO): Promise<PostModel | null>;
	findAllByUserPost(
		findByIdPostDTO: IFindAllByUserPostDTO,
	): Promise<PostModel[] | null>;
}

export interface IPostService {
	create(
		createPostDTO: ICreatePostDTO,
	): Promise<ResponseServiceType<PostModel>>;
	update(
		updatePostDTO: IUpdatePostDTO,
	): Promise<ResponseServiceType<PostModel>>;
	delete(deletePostDTO: IDeletePostDTO): Promise<ResponseServiceType<void>>;
	findAll(): Promise<ResponseServiceType<PostModel[]>>;
	findById(
		findByIdPostDTO: IFindByIdPostDTO,
	): Promise<ResponseServiceType<PostModel>>;
	findAllByUserPost(
		findAllByUserPostDTO: IFindAllByUserPostDTO,
	): Promise<ResponseServiceType<PostModel[]>>;
}

export interface IPostController {
	create(req: Request, res: Response): Promise<Response>;
	update(req: Request, res: Response): Promise<Response>;
	delete(req: Request, res: Response): Promise<Response>;
	findAll(req: Request, res: Response): Promise<Response>;
	findById(req: Request, res: Response): Promise<Response>;
	findAllByUserPost(req: Request, res: Response): Promise<Response>;
}
