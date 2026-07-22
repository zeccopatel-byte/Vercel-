import React, { useState } from 'react';
import { VercelLogoAnimation } from './components/VercelLogoAnimations';
import { Controls } from './components/Controls';
import { AnimationCard } from './components/AnimationCard';
import { CodeModal } from './components/CodeModal';
import { PRESET_INFOS } from './data/presets';
import { AnimationConfig, AnimationPreset } from './types';
import { Sparkles, Code2, ArrowUpRight, Copy, Check, Download, Layers } from 'lucide-react';

const DEFAULT_CONFIG: AnimationConfig = {
  strokeWidth: 2,
  duration: 1.8,
  size: 140,
  strokeLinecap: 'round',
  fillOnComplete: false,
  speed: 1,
  isPaused: false,
};

export default function App() {
  const [activePreset, setActivePreset] = useState<AnimationPreset>('stroke-draw');
  const [config, setConfig] = useState<AnimationConfig>(DEFAULT_CONFIG);
  const [viewMode, setViewMode] = useState<'spotlight' | 'grid'>('spotlight');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [copiedRawSvg, setCopiedRawSvg] = useState(false);

  const activeInfo = PRESET_INFOS.find((p) => p.id === activePreset) || PRESET_INFOS[0];

  const handleUpdateConfig = (partial: Partial<AnimationConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const handleCopyRawSvg = () => {
    const rawSvg = `<svg class="text-black" viewBox="0 0 115 100" height="100" width="115" data-slot="geist-logo-svg"><g><path fill="currentColor" fill-rule="evenodd" d="M57.5 0 115 100H0z" clip-rule="evenodd"></path></g></svg>`;
    navigator.clipboard.writeText(rawSvg);
    setCopiedRawSvg(true);
    setTimeout(() => setCopiedRawSvg(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-black selection:text-white antialiased">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Horizontal Vercel Logo */}
            <a href="#" className="flex items-center hover:opacity-80 transition-opacity" title="Vercel">
              <svg 
                className="text-black h-5.5 w-auto" 
                viewBox="0 0 261 52" 
                data-slot="geist-logo-svg"
              >
                <g>
                  <path 
                    fill="currentColor" 
                    d="M59.8 52H0L29.9 0zm67.82-38.45q4.9 0 8.81 2.13a15.5 15.5 0 0 1 6.22 6.32q2.3 4.2 2.38 10.26v2.06h-26.35q.27 4.4 2.58 6.92 2.38 2.47 6.36 2.47a8.4 8.4 0 0 0 7.76-4.93l9.16.67q-1.68 4.98-6.29 7.99t-10.63 3q-5.53 0-9.64-2.27a16 16 0 0 1-6.43-6.46 20 20 0 0 1-2.31-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26m62.55 0q4.47 0 8.18 1.66a15.3 15.3 0 0 1 6.15 4.6q2.38 3 2.87 7.05l-9.23.47a8 8 0 0 0-2.8-5 7.7 7.7 0 0 0-5.17-1.86q-4.33 0-6.7 3-2.4 3-2.39 8.52t2.38 8.52q2.37 3 6.71 3 3.15 0 5.39-1.87 2.24-1.92 2.72-5.46l9.3.4a14.7 14.7 0 0 1-2.87 7.33 16 16 0 0 1-6.15 4.86 21 21 0 0 1-8.39 1.66q-5.53 0-9.64-2.26a16 16 0 0 1-6.44-6.46 20 20 0 0 1-2.3-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26m38.66 0q4.9 0 8.8 2.13a15.5 15.5 0 0 1 6.22 6.32q2.31 4.2 2.38 10.26v2.06h-26.35q.28 4.4 2.58 6.92 2.38 2.47 6.36 2.47a8.4 8.4 0 0 0 7.77-4.93l9.15.67q-1.68 5-6.29 7.99t-10.62 3q-5.53 0-9.65-2.27a16 16 0 0 1-6.43-6.46 20 20 0 0 1-2.31-9.72q0-5.52 2.3-9.72a16 16 0 0 1 6.44-6.46 20 20 0 0 1 9.64-2.26M86.9 36.69l17.24-34.33h10.8L89.96 49.63h-6.12L58.85 2.36h10.81zm71.62-15.55a11 11 0 0 1 2.47-4.48q2.28-2.31 6.38-2.31h3.4v7.26h-3.47q-2.91 0-4.79.8a5.8 5.8 0 0 0-2.77 2.5q-.9 1.72-.9 4.37v20.35h-8.89V14.35h8.33zm101.73 28.5h-8.95V2.35h8.95zM127.62 20.26q-3.7 0-6 2.2-2.32 2.2-2.87 6.2h17.05q-.48-4.34-2.72-6.33a7.8 7.8 0 0 0-5.46-2.07m101.2 0q-3.7 0-6 2.2-2.31 2.2-2.87 6.2H237q-.5-4.34-2.73-6.33a7.8 7.8 0 0 0-5.46-2.07"
                  />
                </g>
              </svg>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyRawSvg}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 text-xs font-medium hover:bg-neutral-50 transition-colors"
              title="Copy original raw Vercel SVG element"
            >
              {copiedRawSvg ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-mono">SVG Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="font-mono text-neutral-700">Raw SVG</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="flex items-center gap-1.5 bg-black text-white px-3.5 py-1.5 rounded-xl text-xs font-medium hover:bg-neutral-800 transition-all shadow-xs"
            >
              <Code2 className="w-3.5 h-3.5" />
              Get Code
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Controls Bar */}
        <Controls
          config={config}
          onChangeConfig={handleUpdateConfig}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
          onOpenCodeModal={() => setIsCodeModalOpen(true)}
          onReset={handleReset}
        />

        {/* View Mode: Spotlight Stage */}
        {viewMode === 'spotlight' ? (
          <div className="flex flex-col gap-6">
            {/* Center Spotlight Stage */}
            <div className="relative bg-white border border-neutral-200/90 rounded-3xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-12 sm:p-20 min-h-[420px]">
              {/* Subtle grid pattern background */}
              <div 
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#000 1.2px, transparent 1.2px)',
                  backgroundSize: '24px 24px'
                }}
              />

              {/* Minimal Center Frame Markers */}
              <div className="absolute top-6 left-6 text-[10px] font-mono text-neutral-300">
                POS: [CENTER]
              </div>
              <div className="absolute top-6 right-6 text-[10px] font-mono text-neutral-300">
                SIZE: {config.size}px × {Math.round(config.size * (100 / 115))}px
              </div>

              {/* Centered Motion Container */}
              <div className="relative z-10 flex items-center justify-center">
                <VercelLogoAnimation config={config} preset={activePreset} />
              </div>

              {/* Active Preset Title & Desc below logo */}
              <div className="mt-12 text-center max-w-md z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-mono text-neutral-700 mb-2">
                  <span>▲ {activeInfo.id}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-400" />
                  <span>{config.speed}x speed</span>
                </div>
                <h2 className="text-base font-semibold text-neutral-900">
                  {activeInfo.title}
                </h2>
                <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                  {activeInfo.description}
                </p>
              </div>
            </div>

            {/* Quick Preset Selector Buttons Grid */}
            <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-neutral-500" />
                  Animation Motion Styles (8)
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">
                  Click to switch spotlight motion
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PRESET_INFOS.map((p) => {
                  const isActive = p.id === activePreset;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePreset(p.id)}
                      className={`flex flex-col text-left p-3 rounded-xl border text-xs transition-all ${
                        isActive
                          ? 'bg-black text-white border-black shadow-xs font-medium'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
                      }`}
                    >
                      <span className="font-medium text-xs truncate">{p.title}</span>
                      <span className={`text-[10px] mt-0.5 truncate ${
                        isActive ? 'text-neutral-300' : 'text-neutral-400'
                      }`}>
                        {p.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* View Mode: Grid of all 8 presets */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRESET_INFOS.map((info) => (
              <AnimationCard
                key={info.id}
                info={info}
                config={config}
                isSelected={info.id === activePreset}
                onSelect={() => setActivePreset(info.id)}
                onOpenCode={() => {
                  setActivePreset(info.id);
                  setIsCodeModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* Code Export Modal */}
      <CodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        preset={activePreset}
        config={config}
      />

      {/* Footer */}
      <footer className="border-t border-neutral-100 bg-white py-6 mt-12 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span>▲ Vercel Geist Line Loading Animations</span>
            <span>•</span>
            <span>Pure SVG &amp; Motion</span>
          </div>
          <div className="text-[11px] text-neutral-400">
            Black line stroke on white canvas • Geist design system compliant
          </div>
        </div>
      </footer>
    </div>
  );
}
