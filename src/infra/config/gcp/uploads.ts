import path from "node:path";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import { getFilePathFromUrl } from "../../../shared/utils/gcp";

const storage = new Storage({
	keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const bucketName = "images-social-media-final";
const bucket = storage.bucket(bucketName);

export async function uploadPostsToGCS(
	file: Express.Multer.File,
	folder: string,
) {
	try {
		if (!file) return;

		const uniqueFileName = `${uuidv4()}-${file.originalname}`;
		const fileUpload = bucket.file(`${folder}/${uniqueFileName}`);

		await fileUpload.save(file.buffer, {
			metadata: {
				contentType: file.mimetype,
			},
		});
		console.info({ message: "Imagem salva com sucesso" });
		return `https://storage.googleapis.com/${bucketName}/${folder}/${uniqueFileName}`;
	} catch (error) {
		console.error({ message: "Error ao fazer upload da imagem", error });
	}
}

export async function uploadUsersToGCS(
	file: Express.Multer.File,
	folder: string,
) {
	try {
		if (!file) return;

		const uniqueFileName = `${uuidv4()}-${file.originalname}`;
		const fileUpload = bucket.file(`${folder}/${uniqueFileName}`);

		await fileUpload.save(file.buffer, {
			metadata: {
				contentType: file.mimetype,
			},
		});
		console.info({ message: "Imagem salva com sucesso" });
		return `https://storage.googleapis.com/${bucketName}/${folder}/${uniqueFileName}`;
	} catch (error) {
		console.error({ message: "Error ao fazer upload da imagem", error });
	}
}

export async function deleteUsersFromGCS(filePath: string) {
	try {
		await storage
			.bucket(bucketName)
			.file(getFilePathFromUrl(filePath, bucketName))
			.delete();
		console.info({ message: "Imagem deletada com sucesso" });
	} catch (error) {
		console.error({ message: "Error ao deletar imagem do bucket", error });
	}
}
