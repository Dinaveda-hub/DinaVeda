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
      {/* Recommended Section */}
      {recommended && recommended.length > 0 && (
        <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100/50">
          <div className="flex items-center gap-2 mb-3 text-emerald-700">
            <ArrowUpCircle className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Favor More of</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommended.map((food, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-white border border-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg shadow-sm"
              >
                {food}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Avoid Section */}
      {avoid && avoid.length > 0 && (
        <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100/50">
          <div className="flex items-center gap-2 mb-3 text-rose-700">
            <Ban className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Limit or Avoid</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {avoid.map((food, i) => (
              <span 
                key={i} 
                className="px-3 py-1 bg-white border border-rose-100 text-rose-800 text-[10px] font-bold rounded-lg shadow-sm"
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
