export interface ICommentModel {
	id: number;
	id_user: number;
	id_post: number;
	content: string;
	created_at: Date | null;
}
