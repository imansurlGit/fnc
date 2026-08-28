import React from 'react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  badgeText?: string;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
  variant?: 'default' | 'card' | 'minimal';
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  badgeText,
  title,
  description,
  actionText,
  actionLink,
  onAction,
  variant = 'default',
  className = '',
}) => {
  const isCard = variant === 'card';
  const isMinimal = variant === 'minimal';

  return (
    <div
      className={`flex flex-col items-center justify-center text-center mx-auto ${
        isCard
          ? 'bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm max-w-2xl'
          : isMinimal
          ? 'py-8 px-4 max-w-lg'
          : 'bg-white/60 backdrop-blur-xs rounded-3xl p-8 sm:p-14 border border-slate-200/80 shadow-xs max-w-2xl my-4'
      } ${className}`}
    >
      {/* Icon with glow background */}
      {Icon && (
        <div className="relative mb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-orange-500/10 via-[#154e19]/10 to-amber-500/10 border border-slate-200 flex items-center justify-center text-[#bc4209] shadow-inner">
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#bc4209]" />
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-[#bc4209]/20 to-[#154e19]/20 blur-md -z-10 opacity-70" />
        </div>
      )}

      {/* Optional Badge */}
      {badgeText && (
        <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#bc4209] border border-orange-200/70 text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-2xs">
          {badgeText}
        </span>
      )}

      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-md mb-6 font-normal">
        {description}
      </p>

      {/* Action Button or Link */}
      {(actionText && (actionLink || onAction)) && (
        <div>
          {actionLink ? (
            <Link
              to={actionLink}
              className="inline-flex items-center justify-center bg-[#bc4209] hover:bg-[#9d3606] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {actionText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="inline-flex items-center justify-center bg-[#bc4209] hover:bg-[#9d3606] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
