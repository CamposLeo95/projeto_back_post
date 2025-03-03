export type ICreatePostDTO = {
	content: string;
	id_user: number;
	image_url?: string;
};

export type IUpdatePostDTO = {
	id: number;
	content?: string;
	image_url?: string;
};

export type IDeletePostDTO = {
	id: number;
};

export type IFindAllByUserPostDTO = {
	id_user: number;
};

export type IFindByIdPostDTO = {
	id: number;
};
