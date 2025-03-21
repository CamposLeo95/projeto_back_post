import type { User as UserRaw } from "@prisma/client";
import type { IUserOutputDTO } from "../../../../app/user/dtos/user.dto";
import type { User } from "../../../../domain/entities/user/user.entity";

interface IPrismaCreate {
	name: string;
	email: string;
	admin: boolean;
	password: string;
	image_perfil: string | null;
	image_cover: string | null;
	bio: string | null;
}
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class PrismaUserMapper {
	static toPrisma(props: User): IPrismaCreate {
		return {
			name: props.getName,
			email: props.getEmail,
			admin: props.getAdmin,
			password: props.getPassword,
			image_perfil: props.getImage_perfil,
			image_cover: props.getImage_cover,
			bio: props.getBio,
		};
	}

	static toDomain(props: UserRaw): IUserOutputDTO {
		return {
			id: props.id,
			name: props.name,
			email: props.email,
			admin: props.admin,
			password: props.password,
			image_perfil: props.image_perfil ?? "",
			image_cover: props.image_cover ?? "",
			createdAt: props.createdAt,
			bio: props.bio ?? "",
		};
	}
}
