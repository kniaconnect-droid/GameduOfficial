import React from "react";
import gameduLogo from "../assets/images/gamedu_logo_1783910706826.jpg";

interface WatermarkProps {
  className?: string;
}

export default function Watermark({ className = "" }: WatermarkProps) {
  return (
    <div 
      className={`absolute bottom-4 right-4 z-20 pointer-events-none select-none flex items-center gap-2 bg-white/80 backdrop-blur-sm py-1.5 px-3.5 rounded-full border border-slate-200/60 shadow-md opacity-40 hover:opacity-80 transition-all duration-300 ${className}`}
      id="gamedu-game-watermark"
    >
      <img 
        src={gameduLogo} 
        alt="GamEdu Watermark" 
        className="w-5 h-5 rounded-md object-contain" 
        referrerPolicy="no-referrer" 
      />
      <span className="text-[10px] font-black tracking-widest text-slate-800 uppercase">
        Gam<span className="text-blue-600">Edu</span>
      </span>
    </div>
  );
}
