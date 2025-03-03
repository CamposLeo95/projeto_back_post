export type ResponseServiceType<T> = {
	status: number;
	message: string;
	data?: T;
};
