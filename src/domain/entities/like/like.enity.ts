export class Like {
	constructor(
		private id_user: number,
		private id_post: number,
		private created_at: Date,
	) {}

	getIdUser() {
		return this.id_user;
	}

	getIdPost() {
		return this.id_post;
	}

	getCreatedAt() {
		return this.created_at;
	}
}
