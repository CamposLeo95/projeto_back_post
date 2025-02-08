export type ICommentCreateDTO = {
	id_post: number;
	id_user: number;
	content: string;
};

export type ICommentUpdateDTO = {
	id: number;
	content: string;
	id_user: number;
};

export type ICommentDeleteDTO = {
	id: number;
};

export type ICommentFindByPostIdDTO = {
	id_post: number;
};
