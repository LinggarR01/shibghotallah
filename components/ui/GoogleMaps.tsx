interface GoogleMapsProps {
  address: string;
  title?: string;
  embedUrl: string;
}

export default function GoogleMaps({
  address,
  title = 'Lokasi Pondok',
  embedUrl,
}: GoogleMapsProps) {
  const openMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
      <div className="p-5 sm:p-6 md:p-8">
        <h2 className="text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
          {address}
        </p>

        <a
          href={openMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-900 md:text-base">
          Buka di Google Maps →
        </a>
      </div>

      <div className="overflow-hidden border-t border-gray-100">
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[280px] w-full border-0 sm:h-[340px] lg:h-[420px]"
        />
      </div>
    </div>
  );
}
