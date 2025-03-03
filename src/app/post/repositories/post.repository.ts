import type { Post } from "../../../domain/entities/post/post.entity";
import type {
	ICreatePostDTO,
	IDeletePostDTO,
	IFindAllByUserPostDTO,
	IFindByIdPostDTO,
	IUpdatePostDTO,
} from "../dtos/post.dto";

export abstract class PostRepository {
	abstract create(dataInputDTO: ICreatePostDTO): Promise<void>;
	abstract update(dataInputDTO: IUpdatePostDTO): Promise<void>;
	abstract delete(dataInputDTO: IDeletePostDTO): Promise<void>;
	abstract findAll(): Promise<Post[]>;
	abstract findById(dataInputDTO: IFindByIdPostDTO): Promise<Post>;
	abstract findAllByUserPost(
		dataInputDTO: IFindAllByUserPostDTO,
	): Promise<Post[]>;
}
