import path from "node:path";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage({
	keyFilename: path.resolve(
		__dirname,
		"./social-media-devclub-f136b0da36de.json",
	),
});

const bucketName = "images-social-media";
const bucket = storage.bucket(bucketName);

export async function uploadToGCS(file: Express.Multer.File, folder: string) {
	if (!file) return;

	const uniqueFileName = `${uuidv4()}-${file.originalname}`;
	const fileUpload = bucket.file(`${folder}/${uniqueFileName}`);

	await fileUpload.save(file.buffer, {
		metadata: {
			contentType: file.mimetype,
		},
	});

	return `https://storage.googleapis.com/${bucketName}/${folder}/${uniqueFileName}`;
}
