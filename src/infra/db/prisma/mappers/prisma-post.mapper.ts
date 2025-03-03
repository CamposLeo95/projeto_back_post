import type { Post as PostRaw } from "@prisma/client";
import { Post } from "../../../../domain/entities/post/post.entity";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaPostMapper {
	static toPrisma(props: Post): PostRaw {
		return {
			id: props.getId(),
			content: props.getContent(),
			id_user: props.getIdUser(),
			created_at: props.getCreatedAt(),
			image_url: props.getImageUrl(),
		};
	}

	static toDomain(props: PostRaw): Post {
		return new Post(
			props.id,
			props.content,
			props.id_user,
			props.created_at,
			props.image_url ?? "",
		);
	}
}
