import React from 'react';
import { VercelLogoAnimation } from './VercelLogoAnimations';
import { AnimationConfig, PresetInfo } from '../types';
import { Maximize2, Check } from 'lucide-react';

interface AnimationCardProps {
  info: PresetInfo;
  config: AnimationConfig;
  isSelected: boolean;
  onSelect: () => void;
  onOpenCode: () => void;
}

export const AnimationCard: React.FC<AnimationCardProps> = ({
  info,
  config,
  isSelected,
  onSelect,
  onOpenCode,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex flex-col bg-white rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
        isSelected
          ? 'border-black shadow-md ring-1 ring-black'
          : 'border-neutral-200 hover:border-neutral-400 hover:shadow-xs'
      }`}
    >
      {/* Top status bar */}
      <div className="flex items-center justify-between px-4 pt-3 text-[11px] font-mono text-neutral-400">
        <span>▲ {info.id}</span>
        {isSelected && (
          <span className="flex items-center gap-1 text-black font-semibold bg-neutral-100 px-2 py-0.5 rounded-full text-[10px]">
            <Check className="w-3 h-3 text-black" /> Selected
          </span>
        )}
      </div>

      {/* Animation Canvas Stage (Clean white background) */}
      <div className="flex-1 min-h-[200px] flex items-center justify-center p-6 bg-white relative">
        {/* Subtle geometric dot grid background for visual depth */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}
        />
        
        <VercelLogoAnimation config={config} preset={info.id} />
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-black transition-colors">
            {info.title}
          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenCode();
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono bg-white border border-neutral-200 px-2 py-0.5 rounded hover:bg-black hover:text-white hover:border-black"
          >
            &lt;/&gt; Code
          </button>
        </div>
        <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">
          {info.description}
        </p>
      </div>
    </div>
  );
};
