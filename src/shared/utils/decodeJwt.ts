import jwt from "jsonwebtoken";

export default function decodeJwtToUserId(token: string): number {
	const { userId } = jwt.decode(token) as { userId: string };
	return Number(userId);
}
