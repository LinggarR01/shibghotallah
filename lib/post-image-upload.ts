import { randomUUID } from 'node:crypto';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { slugify } from '@/lib/utils';

export const POST_IMAGE_FORMAT_ERROR = 'Format gambar harus JPG, JPEG, atau PNG.';
export const POST_IMAGE_SIZE_ERROR = 'Ukuran gambar maksimal 2 MB.';

const MAX_POST_IMAGE_SIZE = 2 * 1024 * 1024;
const POST_UPLOAD_PUBLIC_PATH = '/uploads/posts';
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/jpg', 'image/png']);
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function getUploadDir() {
  return path.join(process.cwd(), 'public', 'uploads', 'posts');
}

function getExtension(filename: string) {
  return path.extname(filename).toLowerCase();
}

function isFile(value: FormDataEntryValue | null): value is File {
  return typeof File !== 'undefined' && value instanceof File;
}

function getPostImageFile(formData: FormData) {
  const value = formData.get('coverImage');

  if (!isFile(value)) return null;
  if (value.size === 0 && !value.name) return null;

  return value;
}

function validatePostImage(file: File) {
  const extension = getExtension(file.name);

  if (file.size > MAX_POST_IMAGE_SIZE) {
    return POST_IMAGE_SIZE_ERROR;
  }

  if (!ALLOWED_MIME_TYPES.has(file.type) || !ALLOWED_EXTENSIONS.has(extension)) {
    return POST_IMAGE_FORMAT_ERROR;
  }

  return null;
}

function createSafeFilename(slug: string, extension: string) {
  const safeBase = slugify(slug).slice(0, 80) || 'artikel';
  const suffix = `${Date.now()}-${randomUUID().slice(0, 8)}`;

  return `${safeBase}-${suffix}${extension}`;
}

export async function savePostImageFromFormData(
  formData: FormData,
  slug: string,
) {
  const file = getPostImageFile(formData);

  if (!file) {
    return { imagePath: null, error: null };
  }

  const validationError = validatePostImage(file);

  if (validationError) {
    return { imagePath: null, error: validationError };
  }

  const extension = getExtension(file.name);
  const filename = createSafeFilename(slug, extension);
  const uploadDir = getUploadDir();
  const targetPath = path.join(uploadDir, filename);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(targetPath, Buffer.from(await file.arrayBuffer()));

  return {
    imagePath: `${POST_UPLOAD_PUBLIC_PATH}/${filename}`,
    error: null,
  };
}

export async function deleteUploadedPostImage(imagePath: string | null) {
  if (!imagePath?.startsWith(`${POST_UPLOAD_PUBLIC_PATH}/`)) return;

  const filename = imagePath.slice(POST_UPLOAD_PUBLIC_PATH.length + 1);

  if (!filename || filename !== path.basename(filename)) return;

  try {
    await unlink(path.join(getUploadDir(), filename));
  } catch (error) {
    if (
      typeof error === 'object' &&
      error &&
      'code' in error &&
      error.code === 'ENOENT'
    ) {
      return;
    }

    throw error;
  }
}
