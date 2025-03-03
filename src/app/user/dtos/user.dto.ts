export type IUserInputCreateDTO = {
	name: string;
	email: string;
	password: string;
	admin: boolean;
	image_perfil: string;
	image_cover: string;
	bio: string;
};

export type IUserInputUpdateDTO = {
	id: number;
	name?: string;
	email?: string;
	password?: string;
	admin?: boolean;
	image_perfil?: string;
	image_cover?: string;
	bio?: string;
};

export type IUserOutputDTO = {
	id: number;
	name: string;
	email: string;
	password: string;
	admin: boolean;
	createdAt: Date;
	image_perfil?: string;
	image_cover?: string;
	bio?: string;
};
