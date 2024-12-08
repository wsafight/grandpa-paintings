import sharp from "sharp";
import { stat, readdir } from "node:fs/promises";
import { join } from "node:path";

const dirPath = "./public";

const dir = await readdir(dirPath);

for (const currentPath of dir) {
  const absolutePath = join(dirPath, currentPath);
  const currentFile = await stat(absolutePath);
  if (!currentFile.isDirectory()) {
    continue;
  }
  const imgDir = await readdir(absolutePath);

  for (const imgPath of imgDir) {
    if (
      !imgPath.endsWith("jpg") &&
      !imgPath.endsWith("jpeg") &&
      !imgPath.endsWith("png")
    ) {
      continue;
    }
    const imgAbsolutePath = join(absolutePath, imgPath);

    sharp(imgAbsolutePath)
      .webp()
      .toFile(join(absolutePath, `${imgPath.split(".")[0]}.webp`));
  }

  // console.log(imgDir)
}
