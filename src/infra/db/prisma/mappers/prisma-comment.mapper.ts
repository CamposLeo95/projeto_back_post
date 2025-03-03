import type { Comment as CommentRaw } from "@prisma/client";
import { Comment } from "../../../../domain/entities/comment/comment.entity";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaCommentMapper {
	static toPrisma(props: Comment): CommentRaw {
		return {
			id: props.getId(),
			content: props.getContent(),
			id_post: props.getIdPost(),
			id_user: props.getIdUser(),
			created_at: props.getCreatedAt(),
		};
	}

	static toDomain(props: CommentRaw): Comment {
		return new Comment(
			props.id,
			props.id_post,
			props.id_user,
			props.content,
			props.created_at,
		);
	}
}
