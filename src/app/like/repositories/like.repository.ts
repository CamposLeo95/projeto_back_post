import type {
	ILikeInputDTO,
	ILikeOutputDTO,
	ILikesInputByPost,
} from "../dtos/like.dto";

export abstract class LikeRepository {
	abstract findAllLikesByPostId(
		likeInputDTO: ILikesInputByPost,
	): Promise<ILikeOutputDTO[] | []>;
	abstract findOnlyLike(
		likeInputDTO: ILikeInputDTO,
	): Promise<ILikeOutputDTO | null>;
	abstract create(likeInputDTO: ILikeInputDTO): Promise<void>;
	abstract delete(likeInputDTO: ILikeInputDTO): Promise<void>;
}
