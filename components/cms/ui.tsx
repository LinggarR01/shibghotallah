import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-emerald-100 bg-white shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 sm:p-6', className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn('text-lg font-bold tracking-normal text-gray-950', className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('mt-1 text-sm leading-relaxed text-gray-500', className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 pb-5 sm:px-6 sm:pb-6', className)} {...props} />;
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'danger' | 'secondary';
  size?: 'sm' | 'md' | 'icon';
};

export function Button({
  className,
  variant = 'default',
  size = 'md',
  ...props
}: ButtonProps) {
  const variants = {
    default: 'bg-emerald-700 text-white hover:bg-emerald-800',
    outline:
      'border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50',
    ghost: 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100',
  };
  const sizes = {
    sm: 'h-9 gap-2 px-3 text-sm',
    md: 'h-10 gap-2 px-4 text-sm',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function LinkButton({
  href,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
}) {
  const variants = {
    default: 'bg-emerald-700 text-white hover:bg-emerald-800',
    outline:
      'border border-emerald-200 bg-white text-emerald-800 hover:bg-emerald-50',
    ghost: 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100',
  };
  const sizes = {
    sm: 'h-9 gap-2 px-3 text-sm',
    md: 'h-10 gap-2 px-4 text-sm',
    icon: 'h-10 w-10',
  };

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100',
        props.className,
      )}
    />
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cn(
        'min-h-28 w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100',
        props.className,
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100',
        props.className,
      )}
    />
  );
}

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('text-sm font-semibold text-gray-800', className)}
      {...props}
    />
  );
}

export function Alert({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'danger' }) {
  return (
    <div
      className={cn(
        'rounded-2xl border px-4 py-3 text-sm leading-relaxed',
        variant === 'danger'
          ? 'border-red-200 bg-red-50 text-red-700'
          : 'border-emerald-200 bg-emerald-50 text-emerald-800',
        className,
      )}
      {...props}
    />
  );
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'draft' | 'published' | 'archived' | 'outline';
}) {
  const variants = {
    default: 'bg-emerald-100 text-emerald-800',
    draft: 'bg-slate-100 text-slate-700',
    published: 'bg-emerald-100 text-emerald-800',
    archived: 'bg-amber-100 text-amber-800',
    outline: 'border border-gray-200 bg-white text-gray-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function Table({
  className,
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn('w-full text-left text-sm', className)} {...props} />
    </div>
  );
}

export function Th({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'border-b border-gray-100 px-4 py-3 text-xs font-bold uppercase text-gray-500',
        className,
      )}
      {...props}
    />
  );
}

export function Td({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('border-b border-gray-100 px-4 py-4 align-top', className)}
      {...props}
    />
  );
}
