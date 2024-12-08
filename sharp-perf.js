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

    const webp = sharp(imgAbsolutePath).webp()
    const imgName = imgPath.split(".")[0]

    // 目前先这样处理
    if (absolutePath.includes('certificate-of-honor')) {
      webp.resize(1296)
    } else if (absolutePath.includes('author')) {
      webp.resize(416)
    } else if (absolutePath.includes('images')) {
      if (imgName.length > 6) {
        webp.resize(636)
      } else {
        webp.resize(306)
      }
    }

    webp.toFile(join(absolutePath, `${imgName}.webp`));
  }
}
