import DataURIParser from "datauri/parser.js";
import path from "path";
interface File {
  originalname: string;
  buffer: Buffer;
}
export const getDataUri = (file: File) => {
  const parser = new DataURIParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};
