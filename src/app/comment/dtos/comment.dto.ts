export type ICommentCreateInputDTO = {
	id_post: number;
	id_user: number;
	content: string;
};

export type ICommentUpdateInputDTO = {
	id: number;
	content: string;
	id_user: number;
};

export type ICommentDeleteInputDTO = {
	id: number;
	id_user: number;
};

export type ICommentFindByPostIdInputDTO = {
	id_post: number;
};

export type ICommentFindByPostIdOutputDTO = {
	idr: number;
	id_post: number;
	id_user: number;
	content: string;
	created_at: Date;
};
