
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
      <div className="bg-[#1e293b] p-2 rounded flex items-center justify-center">
        <div className={cn("flex items-center justify-center", sizeClasses[size])}>
          <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
            {/* Tiffany Blue Background */}
            <rect width="300" height="80" rx="8" fill="#00b3b0" />
            
            {/* Logo Text */}
            <text 
              x="150" 
              y="48" 
              fontSize="28" 
              fontFamily="Arial, sans-serif" 
              fontWeight="bold" 
              fill="white" 
              textAnchor="middle">
              CYBER CREW SCANNER
            </text>
            
            {/* Scanner Icon - Simple wave pattern */}
            <g transform="translate(255, 40)">
              <path d="M-5,0 C0,-10 5,10 10,0" stroke="white" strokeWidth="3" fill="none" />
              <path d="M-10,0 C-2,-15 7,15 15,0" stroke="white" strokeWidth="2" fill="none" />
              <path d="M-15,0 C-5,-20 10,20 20,0" stroke="white" strokeWidth="1.5" fill="none" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
