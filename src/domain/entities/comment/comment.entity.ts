export class Comment {
	constructor(
		private id: number,
		private id_user: number,
		private id_post: number,
		private content: string,
		private created_at: Date,
	) {}

	getId() {
		return this.id;
	}

	getIdUser() {
		return this.id_user;
	}

	getIdPost() {
		return this.id_post;
	}

	getContent() {
		return this.content;
	}

	getCreatedAt() {
		return this.created_at;
	}

	setContent(content: string) {
		this.content = content;
	}
}
