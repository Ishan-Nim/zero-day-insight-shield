
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
          <svg viewBox="0 0 300 80" xmlns="http://www.w3.org/2000/svg">
            {/* Tiffany Blue Background */}
            <rect width="300" height="80" rx="8" fill="#00b3b0" />
            
            {/* Logo Text */}
            <g transform="translate(15, 45)">
              <text 
                fontSize="22" 
                fontFamily="Arial, sans-serif" 
                fontWeight="bold"
                fill="white">
                CYBER CREW SCANNER
              </text>
            </g>
            
            {/* Scanner Icon */}
            <g transform="translate(230, 40)">
              <path d="M0,0 C10,-20 20,20 30,0" stroke="white" strokeWidth="3" fill="none" />
              <path d="M-10,0 C5,-30 15,30 30,0" stroke="white" strokeWidth="2" fill="none" />
              <path d="M-20,0 C0,-40 10,40 30,0" stroke="white" strokeWidth="1.5" fill="none" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
