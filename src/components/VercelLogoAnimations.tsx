import React from 'react';
import { motion } from 'motion/react';
import { AnimationConfig, AnimationPreset } from '../types';

interface LogoProps {
  config: AnimationConfig;
  preset: AnimationPreset;
}

export const VercelLogoAnimation: React.FC<LogoProps> = ({ config, preset }) => {
  const { strokeWidth, duration, size, strokeLinecap, fillOnComplete, speed, isPaused } = config;
  const effectiveDuration = duration / speed;

  // ViewBox settings
  const width = size;
  const height = Math.round(size * (100 / 115));

  // Triangle path string (115 x 100 viewBox)
  // Top: 57.5, 0 | Right: 115, 100 | Left: 0, 100
  const pathD = "M 57.5,0 L 115,100 L 0,100 Z";

  switch (preset) {
    case 'stroke-draw':
      return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
          <motion.svg
            width={width}
            height={height}
            viewBox="0 0 115 100"
            className="overflow-visible"
          >
            <motion.path
              d={pathD}
              fill={fillOnComplete ? "#000000" : "none"}
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinecap={strokeLinecap}
              strokeLinejoin="round"
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={isPaused ? { pathLength: 0.5, fillOpacity: fillOnComplete ? 0.3 : 0 } : {
                pathLength: [0, 1, 1, 0],
                fillOpacity: fillOnComplete ? [0, 0, 1, 0] : 0,
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.45, 0.75, 1],
              }}
            />
          </motion.svg>
        </div>
      );

    case 'fractal-split':
      return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
          <svg width={width} height={height} viewBox="0 0 115 100" className="overflow-visible">
            {/* Outer perimeter outline */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeLinecap={strokeLinecap}
            />
            {/* Top inner triangle */}
            <motion.path
              d="M 57.5,0 L 86.25,50 L 28.75,50 Z"
              fill={fillOnComplete ? "#000000" : "none"}
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              animate={isPaused ? {} : {
                scale: [1, 0.85, 1],
                opacity: [0.3, 1, 0.3],
                translateY: [0, -4, 0]
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Bottom-Left inner triangle */}
            <motion.path
              d="M 28.75,50 L 57.5,100 L 0,100 Z"
              fill={fillOnComplete ? "#000000" : "none"}
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              animate={isPaused ? {} : {
                scale: [1, 0.85, 1],
                opacity: [0.3, 1, 0.3],
                translateX: [0, -4, 0]
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: effectiveDuration * 0.2,
              }}
            />
            {/* Bottom-Right inner triangle */}
            <motion.path
              d="M 86.25,50 L 115,100 L 57.5,100 Z"
              fill={fillOnComplete ? "#000000" : "none"}
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              animate={isPaused ? {} : {
                scale: [1, 0.85, 1],
                opacity: [0.3, 1, 0.3],
                translateX: [0, 4, 0]
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: effectiveDuration * 0.4,
              }}
            />
            {/* Center inverted inner triangle outline */}
            <motion.path
              d="M 28.75,50 L 86.25,50 L 57.5,100 Z"
              fill="none"
              stroke="#000000"
              strokeWidth={strokeWidth * 0.8}
              strokeDasharray="4 4"
              animate={isPaused ? {} : {
                strokeDashoffset: [0, 16],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </div>
      );

    case 'corner-beam':
      return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
          <svg width={width} height={height} viewBox="0 0 115 100" className="overflow-visible">
            {/* Background static faint line */}
            <path
              d={pathD}
              fill="none"
              stroke="#e5e5e5"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            {/* Edge 1: Top to Bottom-Right (57.5,0 to 115,100) */}
            <motion.path
              d="M 57.5,0 L 115,100"
              fill="none"
              stroke="#000000"
              strokeWidth={strokeWidth * 1.5}
              strokeLinecap="round"
              animate={isPaused ? {} : {
                pathLength: [0, 0.8, 0],
                pathOffset: [0, 0.2, 1],
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Edge 2: Bottom-Right to Bottom-Left (115,100 to 0,100) */}
            <motion.path
              d="M 115,100 L 0,100"
              fill="none"
              stroke="#000000"
              strokeWidth={strokeWidth * 1.5}
              strokeLinecap="round"
              animate={isPaused ? {} : {
                pathLength: [0, 0.8, 0],
                pathOffset: [0, 0.2, 1],
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: effectiveDuration * 0.33,
              }}
            />
            {/* Edge 3: Bottom-Left to Top (0,100 to 57.5,0) */}
            <motion.path
              d="M 0,100 L 57.5,0"
              fill="none"
              stroke="#000000"
              strokeWidth={strokeWidth * 1.5}
              strokeLinecap="round"
              animate={isPaused ? {} : {
                pathLength: [0, 0.8, 0],
                pathOffset: [0, 0.2, 1],
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: effectiveDuration * 0.66,
              }}
            />
          </svg>
        </div>
      );

    case 'concentric-ripple':
      return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
          <svg width={width} height={height} viewBox="0 0 115 100" className="overflow-visible">
            {[0, 1, 2].map((index) => (
              <motion.path
                key={index}
                d={pathD}
                fill="none"
                stroke="#000000"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
                style={{ transformOrigin: "57.5px 66.6px" }}
                animate={isPaused ? {} : {
                  scale: [0.2, 1.3],
                  opacity: [1, 0],
                  strokeWidth: [strokeWidth * 1.5, 0.5]
                }}
                transition={{
                  duration: effectiveDuration,
                  repeat: Infinity,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (effectiveDuration / 3) * index,
                }}
              />
            ))}
          </svg>
        </div>
      );

    case 'wireframe-3d':
      return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
          <motion.div
            className="flex items-center justify-center"
            style={{ perspective: 600 }}
            animate={isPaused ? {} : {
              rotateY: [0, 180, 360],
              rotateX: [0, 15, 0, -15, 0],
            }}
            transition={{
              duration: effectiveDuration * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg width={width} height={height} viewBox="0 0 115 100" className="overflow-visible">
              <motion.path
                d={pathD}
                fill="none"
                stroke="#000000"
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
              <motion.line
                x1="57.5" y1="0" x2="57.5" y2="100"
                stroke="#000000"
                strokeWidth={strokeWidth * 0.75}
                strokeDasharray="2 2"
              />
              <motion.line
                x1="0" y1="100" x2="86.25" y2="50"
                stroke="#000000"
                strokeWidth={strokeWidth * 0.75}
                strokeDasharray="2 2"
              />
              <motion.line
                x1="115" y1="100" x2="28.75" y2="50"
                stroke="#000000"
                strokeWidth={strokeWidth * 0.75}
                strokeDasharray="2 2"
              />
            </svg>
          </motion.div>
        </div>
      );

    case 'dash-sweep':
      return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
          <svg width={width} height={height} viewBox="0 0 115 100" className="overflow-visible">
            <path
              d={pathD}
              fill="none"
              stroke="#f0f0f0"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
            />
            <motion.path
              d={pathD}
              fill="none"
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeDasharray="30 45"
              animate={isPaused ? {} : {
                strokeDashoffset: [0, -330]
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </svg>
        </div>
      );

    case 'tri-intersect':
      return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
          <svg width={width} height={height} viewBox="0 0 115 100" className="overflow-visible">
            {/* Top vertex vector */}
            <motion.path
              d="M 57.5,-20 L 57.5,100"
              stroke="#000000"
              strokeWidth={strokeWidth * 0.8}
              strokeDasharray="4 4"
              animate={isPaused ? {} : {
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{ duration: effectiveDuration, repeat: Infinity }}
            />
            {/* Top vertex converging line */}
            <motion.line
              x1="57.5" y1="0" x2="115" y2="100"
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              animate={isPaused ? {} : {
                x1: [57.5, 57.5, 57.5],
                y1: [-40, 0, -40],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: effectiveDuration, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Bottom Left line */}
            <motion.line
              x1="0" y1="100" x2="115" y2="100"
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              animate={isPaused ? {} : {
                x1: [-50, 0, -50],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: effectiveDuration, repeat: Infinity, ease: "easeInOut", delay: effectiveDuration * 0.15 }}
            />
            {/* Left upward diagonal */}
            <motion.line
              x1="0" y1="100" x2="57.5" y2="0"
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              animate={isPaused ? {} : {
                x2: [57.5, 57.5, 57.5],
                y2: [140, 0, 140],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: effectiveDuration, repeat: Infinity, ease: "easeInOut", delay: effectiveDuration * 0.3 }}
            />
            {/* Solid full triangle pulse at center intersection */}
            <motion.path
              d={pathD}
              fill={fillOnComplete ? "#000000" : "none"}
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              animate={isPaused ? {} : {
                opacity: [0, 0, 1, 0],
                scale: [0.95, 0.95, 1, 0.95]
              }}
              style={{ transformOrigin: "57.5px 50px" }}
              transition={{ duration: effectiveDuration, repeat: Infinity, times: [0, 0.5, 0.75, 1] }}
            />
          </svg>
        </div>
      );

    case 'elastic-breathing':
      return (
        <div className="relative flex items-center justify-center" style={{ width, height }}>
          <motion.svg
            width={width}
            height={height}
            viewBox="0 0 115 100"
            className="overflow-visible"
          >
            <motion.path
              d={pathD}
              fill={fillOnComplete ? "#000000" : "none"}
              stroke="#000000"
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              strokeLinecap={strokeLinecap}
              style={{ transformOrigin: "57.5px 66.6px" }}
              animate={isPaused ? {} : {
                scale: [0.85, 1.15, 0.85],
                strokeWidth: [strokeWidth * 0.7, strokeWidth * 2.2, strokeWidth * 0.7],
                fillOpacity: fillOnComplete ? [0.1, 0.9, 0.1] : 0
              }}
              transition={{
                duration: effectiveDuration,
                repeat: Infinity,
                ease: [0.34, 1.56, 0.64, 1], // elastic overshoot
              }}
            />
          </motion.svg>
        </div>
      );

    default:
      return null;
  }
};
