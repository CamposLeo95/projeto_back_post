import type { Replace } from "../../../utils/replace";

type IUserModel = {
	id: number;
	email: string;
	name: string;
	password: string;
	admin: boolean;
	createdAt: Date;
	updatedAt: Date;
	image_perfil: string;
	image_cover: string;
	bio: string;
};

export class User {
	private readonly _id: number;
	private readonly _createdAt: Date;
	private readonly _updatedAt: Date;
	private email: string;
	private name: string;
	private password: string;
	private admin: boolean;
	private image_perfil: string | null;
	private image_cover: string | null;
	private bio: string | null;

	constructor(
		props: Replace<
			IUserModel,
			{
				id?: number;
				admin?: boolean;
				createdAt?: Date;
				updatedAt?: Date;
			}
		>,
	) {
		this._id = props.id ?? 0;
		this.email = props.email;
		this.name = props.name;
		this.password = props.password;
		this.admin = props.admin ?? false;
		this._createdAt = props.createdAt ?? new Date();
		this._updatedAt = props.updatedAt ?? new Date();
		this.image_perfil = props.image_perfil ?? "";
		this.image_cover = props.image_cover ?? "";
		this.bio = props.bio ?? "";
	}

	get getId(): number {
		return this._id;
	}

	get getEmail(): string {
		return this.email;
	}

	get getName(): string {
		return this.name;
	}

	get getPassword(): string {
		return this.password;
	}

	get getAdmin(): boolean {
		return this.admin;
	}

	get getCreatedAt(): Date {
		return this._createdAt;
	}

	get getUpdatedAt(): Date {
		return this._updatedAt;
	}

	get getImage_perfil(): string | null {
		return this.image_perfil ?? null;
	}

	get getImage_cover(): string | null {
		return this.image_cover ?? null;
	}

	get getBio(): string | null {
		return this.bio ?? null;
	}

	set setEmail(value: string) {
		this.email = value;
	}

	set setName(value: string) {
		this.name = value;
	}

	set setPassword(value: string) {
		this.password = value;
	}

	set setAdmin(value: boolean) {
		this.admin = value;
	}

	set setImage_perfil(value: string) {
		this.image_perfil = value;
	}

	set setImage_cover(value: string) {
		this.image_cover = value;
	}

	set setBio(value: string) {
		this.bio = value;
	}
}
