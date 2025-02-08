export function getFilePathFromUrl(fileUrl: string, bucketName: string) {
	return fileUrl.replace(`https://storage.googleapis.com/${bucketName}/`, "");
}
