import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Quote } from 'lucide-react';

export const PressSection: React.FC = () => {
  const { data } = usePortfolio();

  return (
    <section id="press" className="py-28 px-6 border-t border-[#dfb877]/10 bg-[#0a0a0b] relative">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#dfb877]">
            Critical Acclaim
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Press & Client Reviews
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.press.map((review) => (
            <div
              key={review.id}
              className="glass-card rounded-3xl p-8 space-y-6 flex flex-col justify-between transition-all hover:border-[#dfb877]/40"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#dfb877]/40" />
                <p className="font-serif text-lg text-gray-200 leading-relaxed italic">
                  "{review.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#dfb877]/10 space-y-1">
                <div className="text-sm font-serif font-bold text-white">
                  {review.source}
                </div>
                <div className="text-xs uppercase tracking-wider text-[#dfb877] font-medium">
                  {review.author} · {review.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
