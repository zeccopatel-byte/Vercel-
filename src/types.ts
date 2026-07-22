export type AnimationPreset = 
  | 'stroke-draw'
  | 'fractal-split'
  | 'corner-beam'
  | 'concentric-ripple'
  | 'wireframe-3d'
  | 'dash-sweep'
  | 'tri-intersect'
  | 'elastic-breathing';

export interface AnimationConfig {
  strokeWidth: number; // e.g. 1.5, 2, 3, 4
  duration: number; // e.g. 1.5, 2, 3
  size: number; // e.g. 80, 120, 160
  strokeLinecap: 'butt' | 'round' | 'square';
  fillOnComplete: boolean;
  speed: number; // 0.5, 1, 2
  isPaused: boolean;
}

export interface PresetInfo {
  id: AnimationPreset;
  title: string;
  subtitle: string;
  description: string;
}
