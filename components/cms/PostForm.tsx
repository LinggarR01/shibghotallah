'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { Alert, Button, Card, CardContent, Input, Label, Select, Textarea } from '@/components/cms/ui';
import { toast } from '@/components/cms/ToastProvider';
import type { FormState } from '@/lib/cms-actions';
import type { PostStatus } from '@/lib/cms-data';
import { slugify } from '@/lib/utils';

type CategoryOption = {
  id: number;
  name: string;
};

type PostFormValues = {
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  image?: string | null;
  status?: PostStatus;
  categoryId?: number | null;
  publishedAt?: string;
};

const IMAGE_FORMAT_ERROR = 'Format gambar harus JPG, JPEG, atau PNG.';
const IMAGE_SIZE_ERROR = 'Ukuran gambar maksimal 2 MB.';
const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png']);
const ALLOWED_IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function validateImageFile(file: File | null) {
  if (!file) return null;

  const dotIndex = file.name.lastIndexOf('.');
  const extension = dotIndex >= 0 ? file.name.slice(dotIndex).toLowerCase() : '';

  if (file.size > MAX_IMAGE_SIZE) {
    return IMAGE_SIZE_ERROR;
  }

  if (
    !ALLOWED_IMAGE_TYPES.has(file.type) ||
    !ALLOWED_IMAGE_EXTENSIONS.has(extension)
  ) {
    return IMAGE_FORMAT_ERROR;
  }

  return null;
}

export default function PostForm({
  action,
  categories,
  initialValues,
  submitLabel,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  categories: CategoryOption[];
  initialValues?: PostFormValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [slug, setSlug] = useState(initialValues?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  const displayedImage = imagePreview ?? initialValues?.image ?? null;

  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        {state.error ? (
          <Alert variant="danger" className="mb-5">
            {state.error}
          </Alert>
        ) : null}

        <form
          action={formAction}
          className="space-y-5"
          onSubmit={(event) => {
            const input = event.currentTarget.elements.namedItem('coverImage');
            const file =
              input instanceof HTMLInputElement
                ? (input.files?.[0] ?? null)
                : null;
            const error = validateImageFile(file);

            setImageError(error);

            if (error) {
              event.preventDefault();
            }
          }}>
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Judul</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(event) => {
                  const value = event.target.value;
                  setTitle(value);

                  if (!slugTouched) {
                    setSlug(slugify(value));
                  }
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setSlug(slugify(event.target.value));
                }}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={initialValues?.excerpt ?? ''}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Konten</Label>
            <Textarea
              id="content"
              name="content"
              defaultValue={initialValues?.content ?? ''}
              rows={12}
              required
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="coverImage">Gambar Artikel</Label>
              {displayedImage ? (
                <div
                  className="h-44 rounded-xl border border-gray-200 bg-gray-50 bg-cover bg-center"
                  style={{ backgroundImage: `url(${displayedImage})` }}
                  aria-label="Preview gambar artikel"
                />
              ) : (
                <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 text-sm font-medium text-gray-400">
                  Belum ada gambar
                </div>
              )}
              <Input
                id="coverImage"
                name="coverImage"
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                className="h-auto py-2 file:mr-3 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-emerald-800"
                onChange={(event) => {
                  const file = event.currentTarget.files?.[0] ?? null;
                  const error = validateImageFile(file);

                  setImageError(error);

                  if (imagePreview) {
                    URL.revokeObjectURL(imagePreview);
                  }

                  setImagePreview(file && !error ? URL.createObjectURL(file) : null);
                }}
              />
              <p className="text-xs font-medium text-gray-500">
                Format JPG, JPEG, PNG. Maksimal 2 MB.
              </p>
              {imageError ? (
                <p className="text-sm font-semibold text-red-600">{imageError}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Kategori</Label>
              <Select
                id="categoryId"
                name="categoryId"
                defaultValue={initialValues?.categoryId?.toString() ?? ''}>
                <option value="">Tanpa kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                name="status"
                defaultValue={initialValues?.status ?? 'draft'}
                required>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishedAt">Published At</Label>
              <Input
                id="publishedAt"
                name="publishedAt"
                type="datetime-local"
                defaultValue={initialValues?.publishedAt ?? ''}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <Link
              href="/dashboard/posts"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50">
              Batal
            </Link>
            <Button type="submit" disabled={pending}>
              {pending ? 'Menyimpan...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
