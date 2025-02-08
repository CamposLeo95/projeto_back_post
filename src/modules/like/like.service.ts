import type { IFindByPostId, ILikeDTO } from "./like.dto";
import type { ILikeRepository, ILikeService } from "./like.interface";
import { ILikeModel } from "./like.model";

class LikeService implements ILikeService {
	likeRepository: ILikeRepository;

	constructor(LikeRepository: ILikeRepository) {
		this.likeRepository = LikeRepository;
	}

	async toggleLike(likeDTO: ILikeDTO) {
		try {
			const isLike = await this.likeRepository.findOnly(likeDTO);

			if (isLike) {
				await this.likeRepository.delete(likeDTO);
				return { status: 200, message: "Like removido com sucesso" };
			}

			await this.likeRepository.create(likeDTO);
			return { status: 201, message: "Like adicionado com sucesso" };
		} catch (error) {
			return { status: 500, message: "Erro interno" };
		}
	}

	async findAllByPostId(likeDTO: IFindByPostId) {
		try {
			const likes = await this.likeRepository.findAllByPostId(likeDTO);
			if (!likes) {
				return { status: 404, message: "Nenhum like encontrado" };
			}
			return { status: 200, message: "", data: likes };
		} catch (error) {
			console.error("Erro ao buscar likes", likeDTO);
			return { status: 500, message: "Erro interno" };
		}
	}

	async findOnly(likeDTO: ILikeDTO) {
		try {
			const like = await this.likeRepository.findOnly(likeDTO);
			if (!like) {
				return { status: 404, message: "Nenhum like encontrado" };
			}
			return { status: 200, message: "", data: like };
		} catch (error) {
			return { status: 500, message: "Erro interno" };
		}
	}
}
export { LikeService };
