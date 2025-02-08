import type {
	ICreatePostDTO,
	IDeletePostDTO,
	IFindAllByUserPostDTO,
	IFindByIdPostDTO,
	IUpdatePostDTO,
} from "./post.dto";
import type { IPostRepository, IPostService } from "./post.interface";

class PostService implements IPostService {
	private postRepository: IPostRepository;

	constructor(postRepository: IPostRepository) {
		this.postRepository = postRepository;
	}

	async create(createPostDTO: ICreatePostDTO) {
		try {
			const { content } = createPostDTO;

			if (!content) {
				return { status: 403, message: "Conteudo do post é obrigatório" };
			}

			const post = await this.postRepository.create(createPostDTO);
			if (!post) {
				return { status: 500, message: "Erro ao criar post" };
			}

			return { status: 201, message: "Post criado com sucesso", data: post };
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}

	async update(updatePostDTO: IUpdatePostDTO) {
		try {
			const post = await this.postRepository.update(updatePostDTO);
			if (!post) {
				return { status: 404, message: "Post não encontrado" };
			}
			return {
				status: 200,
				message: "Post atualizado com sucesso",
				data: post,
			};
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}

	async findAll() {
		try {
			const posts = await this.postRepository.findAll();
			if (!posts) {
				return { status: 404, message: "nenhum post encontrado" };
			}
			return { status: 200, message: "", data: posts };
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}

	async findById(findByIdPostDTO: IFindByIdPostDTO) {
		try {
			console.log("findByIdPostDTO", findByIdPostDTO);
			const posts = await this.postRepository.findById({
				id: findByIdPostDTO.id,
			});

			if (!posts) {
				return { status: 404, message: "post nao encontrado!" };
			}

			return { status: 200, message: "", data: posts };
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}

	async delete(deletePostDTO: IDeletePostDTO) {
		try {
			await this.postRepository.delete(deletePostDTO);
			return { status: 203, message: "Post deletado com sucesso!" };
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}

	async findAllByUserPost(findAllByUserPostDTO: IFindAllByUserPostDTO) {
		try {
			const posts =
				await this.postRepository.findAllByUserPost(findAllByUserPostDTO);
			if (!posts) {
				return { status: 404, message: "nenhum post encontrado" };
			}

			return { status: 200, message: "", data: posts };
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}
}

export { PostService };
