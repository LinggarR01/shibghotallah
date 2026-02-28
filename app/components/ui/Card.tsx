import { Falsafah } from '@/app/data/constant';

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
        </div>
      ))}
    </div>
  );
}
