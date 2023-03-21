import Compressor from 'compressorjs';

export default async function compressImage(file: File): Promise<File | Error> {
  return await new Promise((resolve, reject) => {
    // eslint-disable-next-line no-new
    new Compressor(file, {
      quality: 0.9,
      mimeType: 'image/webp',
      maxWidth: 1920,
      maxHeight: 1080,
      resize: 'contain',
      success: (fileResult: File) => {
        resolve(fileResult);
      },
      error: (err: unknown) => {
        reject(err);
      },
    });
  });
}
