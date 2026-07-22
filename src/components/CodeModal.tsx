import React, { useState } from 'react';
import { Copy, Check, X, Code2, FileCode } from 'lucide-react';
import { AnimationConfig, AnimationPreset } from '../types';
import { generateReactCode, generateSvgCssCode } from '../utils/codeGen';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: AnimationPreset;
  config: AnimationConfig;
}

export const CodeModal: React.FC<CodeModalProps> = ({ isOpen, onClose, preset, config }) => {
  const [tab, setTab] = useState<'react' | 'css'>('react');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const code = tab === 'react' 
    ? generateReactCode(preset, config) 
    : generateSvgCssCode(preset, config);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-mono text-xs">
              ▲
            </div>
            <div>
              <h3 className="font-medium text-neutral-900 text-sm tracking-tight">Export Loader Code</h3>
              <p className="text-xs text-neutral-500">Preset: <span className="font-mono text-black">{preset}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4">
          <button
            onClick={() => setTab('react')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              tab === 'react'
                ? 'bg-black text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            React (Motion)
          </button>
          <button
            onClick={() => setTab('css')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              tab === 'css'
                ? 'bg-black text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            HTML & CSS
          </button>
        </div>

        {/* Code Content Area */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-neutral-800 bg-neutral-50 rounded-xl m-6 border border-neutral-200/80 leading-relaxed">
          <pre className="whitespace-pre-wrap">{code}</pre>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-100 bg-neutral-50/50">
          <span className="text-xs text-neutral-500">
            Copy into your Next.js or React codebase
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-neutral-800 transition-all shadow-sm active:scale-98"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Code
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
