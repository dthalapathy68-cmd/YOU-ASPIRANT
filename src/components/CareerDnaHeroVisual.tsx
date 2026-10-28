import React from 'react';
import { Compass, Sparkles, CheckCircle2, TrendingUp, Cpu, Palette, BarChart3 } from 'lucide-react';

export const CareerDnaHeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[540px] mx-auto aspect-square flex items-center justify-center select-none">
      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute inset-0 rounded-full filter blur-[70px] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244, 163, 64, 0.4) 0%, rgba(169, 132, 161, 0.3) 50%, transparent 75%)'
        }}
      />

      {/* SVG Interconnected Pathways and Rings */}
      <svg 
        viewBox="0 0 500 500" 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Soft Plum Concentric Orbit Rings */}
        <circle cx="250" cy="250" r="210" stroke="#EDE5E8" strokeWidth="1.5" strokeDasharray="4 6" className="opacity-70" />
        <circle cx="250" cy="250" r="160" stroke="#A984A1" strokeWidth="1.2" strokeOpacity="0.35" />
        <circle cx="250" cy="250" r="105" stroke="#542744" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 5" />

        {/* Dynamic Curved Pathway Arcs */}
        <path 
          d="M70 250 C120 130 180 80 250 80 C320 80 410 130 430 230" 
          stroke="#F4A340" 
          strokeWidth="2" 
          strokeOpacity="0.75" 
          className="pathway-flowing-stroke" 
        />
        <path 
          d="M100 370 C160 420 340 430 400 320" 
          stroke="#542744" 
          strokeWidth="2" 
          strokeOpacity="0.5" 
          className="pathway-flowing-stroke" 
        />
        <path 
          d="M160 140 Q250 250 340 360" 
          stroke="#754565" 
          strokeWidth="1.5" 
          strokeOpacity="0.4" 
        />
        <path 
          d="M140 350 Q250 250 360 150" 
          stroke="#F4A340" 
          strokeWidth="1.5" 
          strokeOpacity="0.5" 
        />

        {/* Constellation Golden Spark Points */}
        <circle cx="250" cy="80" r="5" fill="#F4A340" />
        <circle cx="250" cy="80" r="10" stroke="#F4A340" strokeWidth="1" strokeOpacity="0.5" className="animate-ping" />

        <circle cx="430" cy="230" r="4.5" fill="#542744" />
        <circle cx="100" cy="370" r="4.5" fill="#F4A340" />
        <circle cx="400" cy="320" r="5" fill="#754565" />
        <circle cx="70" cy="250" r="4" fill="#A984A1" />
      </svg>

      {/* Orbiting Interactive Node Pills */}
      {/* Node 1: Creative & Design */}
      <div className="absolute top-[8%] left-[22%] -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EDE5E8] shadow-subtle hover:scale-105 transition-transform">
        <div className="w-5 h-5 rounded-full bg-[#F5EDF3] flex items-center justify-center text-[#542744]">
          <Palette className="w-3 h-3 text-[#542744]" />
        </div>
        <span className="text-xs font-semibold text-[#542744]">UI/UX & Design</span>
      </div>

      {/* Node 2: Technology & Software */}
      <div className="absolute top-[18%] right-[5%] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#FADCB3] shadow-subtle hover:scale-105 transition-transform">
        <div className="w-5 h-5 rounded-full bg-[#FFE7C7] flex items-center justify-center text-[#F4A340]">
          <Cpu className="w-3 h-3 text-[#542744]" />
        </div>
        <span className="text-xs font-semibold text-[#542744]">Software Engineering</span>
      </div>

      {/* Node 3: Data Analytics */}
      <div className="absolute bottom-[16%] left-[8%] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EDE5E8] shadow-subtle hover:scale-105 transition-transform">
        <div className="w-5 h-5 rounded-full bg-[#F5EDF3] flex items-center justify-center text-[#754565]">
          <BarChart3 className="w-3 h-3 text-[#754565]" />
        </div>
        <span className="text-xs font-semibold text-[#542744]">Data & Analytics</span>
      </div>

      {/* Node 4: Product & Growth */}
      <div className="absolute bottom-[22%] right-[10%] flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#EDE5E8] shadow-subtle hover:scale-105 transition-transform">
        <div className="w-5 h-5 rounded-full bg-[#F5EDF3] flex items-center justify-center text-[#27845D]">
          <TrendingUp className="w-3 h-3 text-[#27845D]" />
        </div>
        <span className="text-xs font-semibold text-[#542744]">Business & Strategy</span>
      </div>

      {/* Centerpiece: Floating Result Preview Card */}
      <div className="relative z-10 w-[270px] bg-[#FFFFFF]/95 backdrop-blur-md border border-[#EDE5E8] rounded-card p-5 shadow-floating transition-all duration-300 hover:shadow-plum-glow">
        {/* Top Tag & Sparkle */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#F5EDF3] text-[#542744] border border-[#DBCBD6]">
            Career DNA Match
          </span>
          <Sparkles className="w-4 h-4 text-[#F4A340]" />
        </div>

        {/* Title */}
        <h4 className="font-heading font-bold text-base text-[#542744] leading-tight mb-1">
          Frontend Developer
        </h4>
        <p className="text-xs text-[#77717A] mb-3">
          High alignment with Logic & Visual Craft
        </p>

        {/* Mini Dimension Bars */}
        <div className="space-y-2 mb-4">
          <div>
            <div className="flex justify-between text-[11px] font-medium text-[#29232C] mb-1">
              <span>Technology & Logic</span>
              <span className="font-bold text-[#542744]">92%</span>
            </div>
            <div className="h-1.5 w-full bg-[#F5EDF3] rounded-full overflow-hidden">
              <div className="h-full bg-[#542744] rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] font-medium text-[#29232C] mb-1">
              <span>Visual & UI Craft</span>
              <span className="font-bold text-[#F4A340]">84%</span>
            </div>
            <div className="h-1.5 w-full bg-[#F5EDF3] rounded-full overflow-hidden">
              <div className="h-full bg-[#F4A340] rounded-full" style={{ width: '84%' }} />
            </div>
          </div>
        </div>

        {/* Next Step Pill */}
        <div className="pt-2 border-t border-[#EDE5E8] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#27845D] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>FuturePath Ready</span>
          </div>
          <span className="text-[11px] text-[#77717A] font-semibold">Stage 1 of 7</span>
        </div>
      </div>
    </div>
  );
};
