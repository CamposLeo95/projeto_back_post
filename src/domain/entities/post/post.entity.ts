export class Post {
	constructor(
		private id: number,
		private content: string,
		private id_user: number,
		private created_at: Date,
		private image_url: string,
	) {}

	getId(): number {
		return this.id;
	}

	getContent(): string {
		return this.content;
	}

	getIdUser(): number {
		return this.id_user;
	}

	getCreatedAt(): Date {
		return this.created_at;
	}

	getImageUrl(): string {
		return this.image_url;
	}

	setContent(content: string): void {
		this.content = content;
	}

	setIdUser(idUser: number): void {
		this.id_user = idUser;
	}

	setImageUrl(imageUrl: string): void {
		this.image_url = imageUrl;
	}
}
