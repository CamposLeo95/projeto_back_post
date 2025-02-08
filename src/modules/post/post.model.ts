export interface PostModel {
	id: number;
	content: string;
	id_user: number;
	created_at: Date | null;
	image_url: string | null;
}
