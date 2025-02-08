export class AppError extends Error {
	constructor(
		public message: string,
		public readonly statusCode: number,
	) {
		super(message);
		this.statusCode = statusCode;
		Object.setPrototypeOf(this, new.target.prototype);
		Error.captureStackTrace(this);
	}
}
