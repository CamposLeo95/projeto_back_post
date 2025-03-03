export type ILikeInputDTO = {
	id_user: number;
	id_post: number;
};
export type ILikeOutputDTO = {
	id_user: number;
	id_post: number;
	created_at: Date | null;
};

export type ILikesInputByPost = {
	id_post: number;
};
