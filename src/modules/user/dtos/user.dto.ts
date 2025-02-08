export type IUserCreateDTO = {
	name: string;
	email: string;
	password: string;
	admin: boolean;
	image_perfil: string;
	image_cover: string;
	bio: string;
};

export type IUserUpdateDTO = {
	id: number;
	name?: string;
	email?: string;
	password?: string;
	admin?: boolean;
	image_perfil?: string;
	image_cover?: string;
	bio?: string;
};
