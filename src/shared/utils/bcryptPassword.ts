import bcrypt from "bcrypt";

const saltRounds = 10;

export async function hashPassword(senha: string): Promise<string> {
	try {
		const hash = await bcrypt.hash(senha, saltRounds);
		return hash;
	} catch (error) {
		throw new Error("Erro ao gerar hash ${error}");
	}
}

export async function verifyPassword(
	senha: string,
	hash: string,
): Promise<boolean> {
	try {
		const match = await bcrypt.compare(senha, hash);
		return match;
	} catch (error) {
		throw new Error("Erro ao verificar senha ${error}");
	}
}
