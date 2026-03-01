import { Falsafah } from '@/app/data/constant';
import Link from 'next/link';

export default function Card({ content }: { content: Falsafah[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {content.map((item) => (
        <div
          key={item.id}
          className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all duration-300 border border-gray-100 group translate-y-0 hover:-translate-y-2">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors duration-300">
            <div className="text-emerald-600 group-hover:text-white transition-colors duration-300">
              {item.icon}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {item.description}
          </p>
          <Link
            href={item.link}
            className="mt-4 text-emerald-700 font-bold hover:text-emerald-500 transition-colors flex items-center group text-sm md:text-base">
            Pelajari Lebih Lanjut
            <svg
              className="w-4 h-4 md:w-5 md:h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
}
