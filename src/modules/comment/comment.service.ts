import type { IPostRepository } from "../post/post.interface";
import type { UserRepository } from "../user/repositories/user.repository";

import type {
	ICommentCreateDTO,
	ICommentDeleteDTO,
	ICommentFindByPostIdDTO,
	ICommentUpdateDTO,
} from "./comment.dto";
import type { ICommentRepository, ICommentService } from "./comment.interface";

class CommentService implements ICommentService {
	private commentRepository: ICommentRepository;
	private postRepository: IPostRepository;
	private userRepository: UserRepository;

	constructor(
		commentRepository: ICommentRepository,
		postRepository: IPostRepository,
		userRepository: UserRepository,
	) {
		this.commentRepository = commentRepository;
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}

	async create(commentCreateDTO: ICommentCreateDTO) {
		try {
			const { id_post, id_user } = commentCreateDTO;

			//verificar se existe um usuario
			const user = await this.userRepository.findById(id_user);
			if (!user) {
				return { status: 404, message: "Usuario não encontrado" };
			}

			console.log("id_post", id_post);

			//verificar se existe um post
			const post = await this.postRepository.findById({ id: id_post });
			console.log("post", post);
			if (!post) {
				return { status: 404, message: "Post não encontrado" };
			}

			// verificar se existe um conteudo
			if (!commentCreateDTO.content) {
				return { status: 403, message: "Conteudo vazio" };
			}

			const comment = await this.commentRepository.create(commentCreateDTO);
			if (!comment) {
				return { status: 500, message: "Erro ao criar comentario" };
			}

			return {
				status: 201,
				message: "Comentario criado com sucesso",
				data: comment,
			};
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}

	async update(commentUpdateDTO: ICommentUpdateDTO) {
		try {
			// verificar se existe conteudo
			if (!commentUpdateDTO.content) {
				return { status: 403, message: "Conteudo vazio" };
			}

			// verificar se existe um comentario
			const comment = await this.commentRepository.update(commentUpdateDTO);
			if (!comment) {
				return { status: 404, message: "Comentario não encontrado" };
			}

			return {
				status: 200,
				message: "Comentario atualizado com sucesso",
				data: comment,
			};
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}

	async findByPostId(commentByPostIdDTO: ICommentFindByPostIdDTO) {
		try {
			const { id_post } = commentByPostIdDTO;

			// verificar se existe um post
			const post = await this.postRepository.findById({ id: id_post });
			if (!post) {
				return { status: 404, message: "Post não encontrado" };
			}

			const comments =
				await this.commentRepository.findByPostId(commentByPostIdDTO);
			if (!comments) {
				return { status: 404, message: "Comentarios não encontrados" };
			}

			return {
				status: 200,
				message: "Comentarios encontrados",
				data: comments,
			};
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}

	async delete(commentDeleteDTO: ICommentDeleteDTO) {
		try {
			await this.commentRepository.delete(commentDeleteDTO);
			return { status: 203, message: "Comentario deletado" };
		} catch (error) {
			return { status: 500, message: "Erro interno", error };
		}
	}
}

export { CommentService };
