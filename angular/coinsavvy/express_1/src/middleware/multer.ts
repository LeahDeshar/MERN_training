import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("image");

export const multipleUpload = multer({ storage }).array("files", 10);
