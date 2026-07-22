import { AnimationConfig, AnimationPreset } from '../types';

export function generateReactCode(preset: AnimationPreset, config: AnimationConfig): string {
  const { strokeWidth, duration, size, strokeLinecap, fillOnComplete, speed } = config;
  const effectiveDuration = (duration / speed).toFixed(2);

  return `import React from 'react';
import { motion } from 'motion/react';

// Vercel Triangle Loading Animation - Preset: '${preset}'
// Pure Black Line on White Background
export const VercelLoader = () => {
  return (
    <div className="flex items-center justify-center p-8 bg-white">
      <svg width={${size}} height={${Math.round(size * (100 / 115))}} viewBox="0 0 115 100" className="overflow-visible">
        <motion.path
          d="M 57.5,0 L 115,100 L 0,100 Z"
          fill="${fillOnComplete ? "#000000" : "none"}"
          stroke="#000000"
          strokeWidth={${strokeWidth}}
          strokeLinecap="${strokeLinecap}"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            ${fillOnComplete ? 'fillOpacity: [0, 0, 1, 0]' : ''}
          }}
          transition={{
            duration: ${effectiveDuration},
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
};
export default VercelLoader;`;
}

export function generateSvgCssCode(preset: AnimationPreset, config: AnimationConfig): string {
  const { strokeWidth, duration, speed } = config;
  const dur = (duration / speed).toFixed(2);

  return `<!-- Pure HTML/CSS Vercel Triangle Loader -->
<div className="vercel-loader">
  <svg width="${config.size}" height="${Math.round(config.size * (100 / 115))}" viewBox="0 0 115 100">
    <path
      class="vercel-triangle-path"
      d="M 57.5,0 L 115,100 L 0,100 Z"
      fill="none"
      stroke="#000000"
      stroke-width="${strokeWidth}"
      stroke-linejoin="round"
    />
  </svg>
</div>

<style>
.vercel-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.vercel-triangle-path {
  stroke-dasharray: 330;
  stroke-dashoffset: 330;
  animation: vercelDraw ${dur}s ease-in-out infinite;
}

@keyframes vercelDraw {
  0% {
    stroke-dashoffset: 330;
  }
  50%, 75% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -330;
  }
}
</style>`;
}
