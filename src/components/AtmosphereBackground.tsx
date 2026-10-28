import React, { useMemo } from 'react';

interface AtmosphereBackgroundProps {
  showAmbientHeroGlow?: boolean;
}

export const AtmosphereBackground: React.FC<AtmosphereBackgroundProps> = ({
  showAmbientHeroGlow = true
}) => {
  // Deterministic particle positions for performance and consistency
  const particles = useMemo(() => [
    { id: 1, left: '8%', top: '15%', size: 3.5, delay: '0s', duration: '9s' },
    { id: 2, left: '22%', top: '45%', size: 4.5, delay: '2.5s', duration: '12s' },
    { id: 3, left: '38%', top: '25%', size: 3, delay: '4s', duration: '10s' },
    { id: 4, left: '55%', top: '65%', size: 5, delay: '1s', duration: '14s' },
    { id: 5, left: '72%', top: '18%', size: 3, delay: '5.5s', duration: '11s' },
    { id: 6, left: '86%', top: '40%', size: 4, delay: '3s', duration: '13s' },
    { id: 7, left: '15%', top: '80%', size: 4.5, delay: '6s', duration: '15s' },
    { id: 8, left: '65%', top: '85%', size: 3.5, delay: '2s', duration: '11s' },
    { id: 9, left: '92%', top: '75%', size: 4, delay: '4.5s', duration: '13s' },
  ], []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Base Milk White Canvas Fill */}
      <div className="absolute inset-0 bg-[#FFFCF7]" />

      {/* 2. Translucent Drifting Mist Layer 1 - Soft Pale Plum / Amber Blend */}
      <div
        className="anim-mist-1 absolute -top-[20%] -left-[15%] w-[85vw] h-[85vh] rounded-[45%_55%_65%_35%] filter blur-[85px] opacity-40 mix-blend-multiply"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(169, 132, 161, 0.16) 0%, rgba(255, 212, 154, 0.12) 45%, rgba(255, 252, 247, 0) 75%)'
        }}
      />

      {/* 3. Translucent Drifting Mist Layer 2 - Floating Warm Soft Glow */}
      <div
        className="anim-mist-2 absolute top-[35%] -right-[10%] w-[75vw] h-[75vh] rounded-[60%_40%_50%_50%] filter blur-[95px] opacity-35"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(244, 163, 64, 0.10) 0%, rgba(117, 69, 101, 0.08) 50%, rgba(255, 252, 247, 0) 80%)'
        }}
      />

      {/* 4. Ambient Hero Warm Sunlight Glow (Restrained) */}
      {showAmbientHeroGlow && (
        <div
          className="absolute top-[8%] left-[50%] -translate-x-1/2 w-[650px] max-w-[90vw] h-[360px] rounded-full filter blur-[100px] opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(255, 212, 154, 0.45) 0%, rgba(244, 163, 64, 0.18) 50%, rgba(255, 252, 247, 0) 80%)'
          }}
        />
      )}

      {/* 5. Golden Sparkle Particles Floating Slowly */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="anim-particle absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: '#F4A340',
            boxShadow: '0 0 10px 2px rgba(244, 163, 64, 0.6), 0 0 4px 1px rgba(255, 212, 154, 0.8)',
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};
