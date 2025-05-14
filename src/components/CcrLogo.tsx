
import { cn } from "@/lib/utils";

interface CcrLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CcrLogo = ({ size = "md", className }: CcrLogoProps) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-10",
    lg: "h-20"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className="bg-[#1e293b] p-1 rounded flex items-center justify-center">
        <div className={cn("flex items-center justify-center", sizeClasses[size])}>
          <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
            {/* Tiffany Blue Background */}
            <rect width="240" height="80" rx="8" fill="#00b3b0" />
            
            {/* "C" Letters */}
            <path d="M40,20 C28,20 20,30 20,40 C20,50 28,60 40,60 L55,60" 
                  stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M80,20 C68,20 60,30 60,40 C60,50 68,60 80,60 L95,60" 
                  stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
            
            {/* "R" Letter */}
            <path d="M120,20 L120,60" stroke="white" strokeWidth="8" strokeLinecap="round" />
            <path d="M120,20 C130,20 140,25 140,35 C140,45 130,50 120,50" 
                  stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M120,50 L140,60" stroke="white" strokeWidth="8" strokeLinecap="round" />
            
            {/* Scanner Waves */}
            <path d="M170,40 C180,20 190,60 200,40" stroke="white" strokeWidth="4" fill="none" />
            <path d="M160,40 C175,10 185,70 200,40" stroke="white" strokeWidth="3" fill="none" />
            <path d="M150,40 C170,0 180,80 200,40" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
};
