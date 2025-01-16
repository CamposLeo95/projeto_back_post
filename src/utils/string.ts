export function convertToPublicUrl(localPath: string) {
	const baseLocalPath =
		"C:\\Users\\leonardo.campos\\Documents\\social-media\\projeto_back_post\\src\\uploads\\images\\";
	const baseUrl = "http://localhost:3333/uploads/images/";

	// Substitui o caminho local pelo caminho público
	if (localPath.startsWith(baseLocalPath)) {
		const relativePath = localPath.replace(baseLocalPath, ""); // Remove a base local
		return `${baseUrl}${relativePath}`;
	}
}
