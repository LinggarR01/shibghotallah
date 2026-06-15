'use client';

import { useActionState, useState } from 'react';
import { Alert, Button, Card, CardContent, Input, Label, Textarea } from '@/components/cms/ui';
import type { FormState } from '@/lib/cms-actions';
import { slugify } from '@/lib/utils';

type CategoryValues = {
  name?: string;
  slug?: string;
  description?: string | null;
};

export default function CategoryForm({
  action,
  initialValues,
  submitLabel,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: CategoryValues;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const [name, setName] = useState(initialValues?.name ?? '');
  const [slug, setSlug] = useState(initialValues?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));

  return (
    <Card>
      <CardContent className="p-5 sm:p-6">
        {state.error ? (
          <Alert variant="danger" className="mb-5">
            {state.error}
          </Alert>
        ) : null}

        <form action={formAction} className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nama</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(event) => {
                  const value = event.target.value;
                  setName(value);

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
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={initialValues?.description ?? ''}
              rows={4}
            />
          </div>

          <div className="flex justify-end border-t border-gray-100 pt-5">
            <Button type="submit" disabled={pending}>
              {pending ? 'Menyimpan...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
