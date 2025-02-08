import type { ILoginDTO, IVerifyDTO } from "./login.dto";

export interface ILoginService {
	login(loginDTO: ILoginDTO): Promise<{
		status: number;
		message: string;
		token?: string | undefined;
		id?: number;
	}>;
	verifyToken(
		verifyDTO: IVerifyDTO,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	): Promise<{ status: number; message: string; data: any }>;
}
