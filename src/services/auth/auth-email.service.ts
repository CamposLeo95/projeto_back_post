import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUserOutputDTO } from "../../app/user/dtos/user.dto";

export async function checkAuthWithEmail(
	user: IUserOutputDTO,
	password: string,
	chaveSecreta: string,
) {
	if (user && (await bcrypt.compare(password, user.password))) {
		const token = jwt.sign({ userId: user.id }, chaveSecreta, {
			expiresIn: "8h",
		});
		return {
			token,
			id: user.id,
		};
	}
}
