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
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

        <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-600">
          {address}
        </p>

        <a
          href={openMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center text-sm md:text-base font-semibold text-emerald-700 transition hover:text-emerald-900">
          Buka di Google Maps →
        </a>
      </div>

      <div className="h-[320px] w-full md:h-[420px]">
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
        />
      </div>
    </div>
  );
}
