import React from 'react';
import { Play, Pause, RotateCcw, Sliders, LayoutGrid, Maximize2, Code, Zap } from 'lucide-react';
import { AnimationConfig } from '../types';

interface ControlsProps {
  config: AnimationConfig;
  onChangeConfig: (newConfig: Partial<AnimationConfig>) => void;
  viewMode: 'spotlight' | 'grid';
  onToggleViewMode: (mode: 'spotlight' | 'grid') => void;
  onOpenCodeModal: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  config,
  onChangeConfig,
  viewMode,
  onToggleViewMode,
  onOpenCodeModal,
  onReset,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-neutral-200 shadow-sm rounded-2xl p-4 max-w-4xl mx-auto my-4 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Playback Controls & View Mode */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeConfig({ isPaused: !config.isPaused })}
            className="flex items-center justify-center w-9 h-9 rounded-xl bg-black text-white hover:bg-neutral-800 transition-colors shadow-xs"
            title={config.isPaused ? "Play Animation" : "Pause Animation"}
          >
            {config.isPaused ? <Play className="w-4 h-4 ml-0.5 fill-current" /> : <Pause className="w-4 h-4 fill-current" />}
          </button>

          <button
            onClick={onReset}
            className="p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-xl transition-colors"
            title="Reset to Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-5 w-px bg-neutral-200 mx-1" />

          {/* View Mode Toggle */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-xl">
            <button
              onClick={() => onToggleViewMode('spotlight')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'spotlight'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Spotlight
            </button>
            <button
              onClick={() => onToggleViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-black shadow-xs'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Grid (8)
            </button>
          </div>
        </div>

        {/* Sliders and Properties */}
        <div className="flex flex-wrap items-center gap-5">
          {/* Stroke Width Slider */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Stroke</span>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={config.strokeWidth}
              onChange={(e) => onChangeConfig({ strokeWidth: parseFloat(e.target.value) })}
              className="w-20 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <span className="font-mono text-neutral-700 w-8">{config.strokeWidth}px</span>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium flex items-center gap-1">
              <Zap className="w-3 h-3 text-neutral-400" />
              Speed
            </span>
            <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg">
              {[0.5, 1, 1.5, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => onChangeConfig({ speed: s })}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    config.speed === s
                      ? 'bg-black text-white font-semibold'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Size Slider */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Size</span>
            <input
              type="range"
              min="40"
              max="220"
              step="10"
              value={config.size}
              onChange={(e) => onChangeConfig({ size: parseInt(e.target.value, 10) })}
              className="w-20 h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            <span className="font-mono text-neutral-700 w-9">{config.size}px</span>
          </div>

          {/* Fill Cycle Toggle */}
          <label className="flex items-center gap-2 text-xs font-medium text-neutral-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={config.fillOnComplete}
              onChange={(e) => onChangeConfig({ fillOnComplete: e.target.checked })}
              className="w-3.5 h-3.5 rounded border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
            />
            Fill Cycle
          </label>
        </div>

        {/* Code Export */}
        <div className="flex items-center">
          <button
            onClick={onOpenCodeModal}
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-black text-white px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shadow-xs active:scale-98"
          >
            <Code className="w-3.5 h-3.5" />
            Export Code
          </button>
        </div>
      </div>
    </div>
  );
};
