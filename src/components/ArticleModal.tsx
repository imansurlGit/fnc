import React from 'react';
import { X, Calendar } from 'lucide-react';
import type { ArticleModalProps } from '../types';

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl text-slate-900">

        {/* Modal Header Media Image */}
        <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/70 text-white rounded-full transition shadow-md cursor-pointer"
            aria-label="Fermer la modale"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="bg-[#154e19] text-white text-[10px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider mb-2 inline-block shadow">
              {article.category}
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white leading-tight drop-shadow">
              {article.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-[#bc4209]" /> {article.date}
            </span>
          </div>

          <div className="text-[#bc4209] text-sm font-semibold italic border-l-4 border-[#154e19] pl-4 py-2 bg-[#154e19]/10 rounded-r-xl">
            {article.summary}
          </div>

          <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            {article.content}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={onClose}
              className="bg-[#bc4209] hover:bg-[#9d3606] text-white font-bold px-6 py-2 rounded-lg text-xs shadow transition cursor-pointer"
            >
              Fermer l'article
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
