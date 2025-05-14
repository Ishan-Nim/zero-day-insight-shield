
import { cn } from "@/lib/utils";

interface CcrLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CcrLogo = ({ size = "md", className }: CcrLogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-20"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("flex items-center justify-center", sizeClasses[size])}>
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Shield logo */}
          <g transform="translate(10, 30) scale(0.8)">
            <path 
              d="M50,0 C80,20 120,20 150,0 L150,80 C120,120 80,120 50,80 Z" 
              fill="#00b3b0" 
              stroke="#00b3b0" 
              strokeWidth="8"
            />
            <path 
              d="M70,40 L100,70 L130,40" 
              fill="none" 
              stroke="white" 
              strokeWidth="8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <circle cx="130" cy="30" r="10" fill="white" />
          </g>
          
          {/* CYBER CREW Text */}
          <text 
            x="200" 
            y="110" 
            fontSize="80" 
            fontFamily="Arial, sans-serif" 
            fontWeight="bold" 
            letterSpacing="2" 
            fill="#00b3b0" 
            style={{ textTransform: 'uppercase' }}>
            CYBER CREW
          </text>
        </svg>
      </div>
    </div>
  );
}
