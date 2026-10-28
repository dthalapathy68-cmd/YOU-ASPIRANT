import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'plum' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  className = '', 
  variant = 'plum',
  size = 'md' 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const isPlum = variant === 'plum';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Abstract Directional Spark & Pathway Compass Icon */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#542744] to-[#754565] border border-[#F4A340]/30 shadow-sm overflow-hidden group`}>
        {/* Subtle glow */}
        <div className="absolute inset-0 bg-[#F4A340]/10 blur-sm group-hover:bg-[#F4A340]/25 transition-all duration-300" />
        
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-1.5 relative z-10">
          {/* Pathway curve */}
          <path 
            d="M6 26 C12 24 16 12 24 10 C28 9 30 14 32 14" 
            stroke="#F4A340" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            className="opacity-95"
          />
          {/* Compass Starburst Directional Spark */}
          <path 
            d="M18 4 L19.8 14.2 L30 16 L19.8 17.8 L18 28 L16.2 17.8 L6 16 L16.2 14.2 Z" 
            fill="#FFFCF7" 
            className="opacity-95 drop-shadow-sm transition-transform duration-500 group-hover:rotate-45"
          />
          {/* Milestone Golden Spark Point */}
          <circle cx="24" cy="10" r="2.2" fill="#F4A340" className="animate-ping opacity-75" />
          <circle cx="24" cy="10" r="2" fill="#FFFCF7" />
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className={`font-extrabold tracking-tight font-heading ${textSizes[size]} ${isPlum ? 'text-[#542744]' : 'text-[#FFFCF7]'}`}>
            YOU
          </span>
          <span className={`font-light tracking-wide uppercase text-[#F4A340] font-heading ${textSizes[size]}`}>
            ASPIRANT
          </span>
        </div>
        <span className={`text-[9px] font-semibold tracking-wider uppercase mt-0.5 ${isPlum ? 'text-[#77717A]' : 'text-[#FFD49A]'}`}>
          Career DNA & FuturePath
        </span>
      </div>
    </div>
  );
};
