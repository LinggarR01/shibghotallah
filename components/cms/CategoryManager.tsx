'use client';

import { useRouter } from 'next/navigation';
import { FolderTree, Pencil, PlusCircle, Search, Trash2, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import EmptyState from '@/components/cms/EmptyState';
import PageHeader from '@/components/cms/PageHeader';
import { toast } from '@/components/cms/ToastProvider';
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  LinkButton,
  Table,
  Td,
  Textarea,
  Th,
} from '@/components/cms/ui';
import { slugify } from '@/lib/utils';

type CategoryItem = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
};

type CategoryFormValues = {
  name: string;
  slug: string;
  description: string;
};

const emptyValues: CategoryFormValues = {
  name: '',
  slug: '',
  description: '',
};

function getErrorMessage(error: unknown, fallback: string) {
  if (typeof error === 'object' && error && 'message' in error) {
    const message = error.message;

    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return fallback;
}

export default function CategoryManager({
  categories,
  canManageCategories,
  search,
}: {
  categories: CategoryItem[];
  canManageCategories: boolean;
  search: string;
}) {
  const router = useRouter();
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [values, setValues] = useState<CategoryFormValues>(emptyValues);
  const [slugTouched, setSlugTouched] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CategoryItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const dialogOpen = dialogMode !== null;
  const dialogTitle =
    dialogMode === 'edit' ? 'Edit Kategori' : 'Tambah Kategori';
  const submitLabel =
    dialogMode === 'edit' ? 'Update Kategori' : 'Tambah Kategori';

  useEffect(() => {
    if (!dialogOpen) {
      setFormError(null);
    }
  }, [dialogOpen]);

  function openCreateDialog() {
    setDialogMode('create');
    setEditingId(null);
    setValues(emptyValues);
    setSlugTouched(false);
    setFormError(null);
  }

  function openEditDialog(category: CategoryItem) {
    setDialogMode('edit');
    setEditingId(category.id);
    setValues({
      name: category.name,
      slug: category.slug,
      description: category.description ?? '',
    });
    setSlugTouched(true);
    setFormError(null);
  }

  function closeDialog() {
    if (submitting) return;

    setDialogMode(null);
    setEditingId(null);
  }

  async function submitCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.name.trim() || !values.slug.trim()) {
      const message = 'Mohon lengkapi data yang wajib diisi.';

      setFormError(message);
      toast.error(message);
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/admin/categories', {
        method: dialogMode === 'edit' ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: editingId,
          name: values.name,
          slug: values.slug,
          description: values.description,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          result.error ??
            (dialogMode === 'edit'
              ? 'Gagal memperbarui kategori.'
              : 'Gagal menambahkan kategori.'),
        );
      }

      setDialogMode(null);
      setEditingId(null);
      router.refresh();
      toast.success(
        dialogMode === 'edit'
          ? 'Kategori berhasil diperbarui.'
          : 'Kategori berhasil ditambahkan.',
      );
    } catch (error) {
      const message = getErrorMessage(
        error,
        dialogMode === 'edit'
          ? 'Gagal memperbarui kategori.'
          : 'Gagal menambahkan kategori.',
      );

      setFormError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteCategory() {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error ?? 'Gagal menghapus kategori.');
      }

      setDeleteTarget(null);
      router.refresh();
      toast.success('Kategori berhasil dihapus.');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Gagal menghapus kategori.'));
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div>
      <PageHeader
        title="Kategori"
        description="Kelola kategori artikel dan berita pondok."
        actions={
          canManageCategories ? (
            <Button type="button" onClick={openCreateDialog}>
              <PlusCircle className="h-4 w-4" />
              Tambah Kategori
            </Button>
          ) : null
        }
      />

      {!canManageCategories ? (
        <Alert className="mb-5">
          Role author dapat melihat kategori, tetapi perubahan kategori hanya
          dapat dilakukan admin atau editor.
        </Alert>
      ) : null}

      <Card className="mb-5">
        <CardContent className="p-5">
          <form className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
            <div className="space-y-2">
              <Label htmlFor="q">Search</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                <Input
                  id="q"
                  name="q"
                  defaultValue={search}
                  placeholder="Cari nama atau slug kategori"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Cari</Button>
              {search ? (
                <LinkButton href="/dashboard/categories" variant="outline">
                  Reset
                </LinkButton>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      {categories.length === 0 ? (
        <EmptyState
          icon={FolderTree}
          title="Kategori belum ditemukan"
          description={
            search
              ? 'Tidak ada kategori yang cocok dengan pencarian saat ini.'
              : 'Tambahkan kategori agar artikel lebih mudah dikelompokkan.'
          }
          actions={
            canManageCategories ? (
              <Button type="button" onClick={openCreateDialog}>
                <PlusCircle className="h-4 w-4" />
                Tambah Kategori
              </Button>
            ) : null
          }
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Daftar Kategori</CardTitle>
            <CardDescription>
              Post terkait tetap aman saat kategori dihapus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <tr>
                  <Th>Nama</Th>
                  <Th>Slug</Th>
                  <Th>Deskripsi</Th>
                  <Th>Dibuat pada</Th>
                  {canManageCategories ? <Th>Aksi</Th> : null}
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <Td className="font-semibold text-gray-950">
                      {category.name}
                    </Td>
                    <Td className="text-gray-500">{category.slug}</Td>
                    <Td className="max-w-xs text-gray-600">
                      {category.description ?? '-'}
                    </Td>
                    <Td>{category.createdAt}</Td>
                    {canManageCategories ? (
                      <Td>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(category)}
                            aria-label="Edit kategori">
                            <Pencil className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            type="button"
                            variant="danger"
                            size="sm"
                            onClick={() => setDeleteTarget(category)}
                            aria-label="Hapus kategori">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </Td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      )}

      {dialogOpen ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label="Tutup modal kategori"
            className="absolute inset-0 bg-gray-950/45"
            onClick={closeDialog}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-dialog-title"
            className="relative w-full max-w-lg rounded-2xl border border-emerald-100 bg-white shadow-2xl shadow-gray-950/20">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
              <div>
                <h2
                  id="category-dialog-title"
                  className="text-lg font-bold text-gray-950">
                  {dialogTitle}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-gray-500">
                  Isi nama, slug, dan deskripsi kategori artikel.
                </p>
              </div>
              <button
                type="button"
                aria-label="Tutup modal"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-800"
                onClick={closeDialog}
                disabled={submitting}>
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submitCategory} className="space-y-5 p-5">
              {formError ? (
                <Alert variant="danger">{formError}</Alert>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Nama</Label>
                  <Input
                    id="category-name"
                    value={values.name}
                    onChange={(event) => {
                      const nextName = event.target.value;

                      setValues((current) => ({
                        ...current,
                        name: nextName,
                        slug: slugTouched ? current.slug : slugify(nextName),
                      }));
                    }}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-slug">Slug</Label>
                  <Input
                    id="category-slug"
                    value={values.slug}
                    onChange={(event) => {
                      setSlugTouched(true);
                      setValues((current) => ({
                        ...current,
                        slug: slugify(event.target.value),
                      }));
                    }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category-description">Deskripsi</Label>
                <Textarea
                  id="category-description"
                  value={values.description}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  rows={4}
                />
              </div>

              <div className="flex flex-col-reverse gap-2 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  disabled={submitting}>
                  Batal
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Menyimpan...' : submitLabel}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6">
          <button
            type="button"
            aria-label="Tutup konfirmasi hapus"
            className="absolute inset-0 bg-gray-950/45"
            onClick={() => (deleting ? undefined : setDeleteTarget(null))}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-5 shadow-2xl shadow-gray-950/20 sm:p-6">
            <h2 className="text-lg font-bold text-gray-950">Hapus kategori?</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Kategori yang dihapus tidak bisa dikembalikan. Artikel terkait
              tetap aman jika schema mendukung categoryId nullable.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}>
                Batal
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={deleteCategory}
                disabled={deleting}>
                {deleting ? 'Menghapus...' : 'Hapus'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
