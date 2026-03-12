import React from 'react';
import { ChefHat, Ban, ArrowUpCircle } from 'lucide-react';

interface FoodGuidanceProps {
  recommended?: string[];
  avoid?: string[];
}

export default function FoodGuidance({ recommended, avoid }: FoodGuidanceProps) {
  if (!recommended?.length && !avoid?.length) return null;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Recommended */}
      {recommended && recommended.length > 0 && (
        <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-2 mb-3 text-emerald-700">
            <ArrowUpCircle className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">
              Favor More Of
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {recommended.map((food, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-white border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-lg shadow-sm"
              >
                {food}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Avoid */}
      {avoid && avoid.length > 0 && (
        <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
          <div className="flex items-center gap-2 mb-3 text-rose-700">
            <Ban className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-widest">
              Limit or Avoid
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {avoid.map((food, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-white border border-rose-200 text-rose-800 text-xs font-semibold rounded-lg shadow-sm"
              >
                {food}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
