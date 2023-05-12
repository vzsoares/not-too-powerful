import sharp from 'sharp';

export async function ProcessImage(
  file: Buffer,
  quality = 80,
): Promise<Buffer> {
  const limit = 7000000; // 7MB
  const result = await sharp(file)
    .resize({ width: 1920 })
    .webp({ quality })
    .toBuffer();
  if (result.length > limit) return await ProcessImage(result, quality - 10);
  else return result;
}
