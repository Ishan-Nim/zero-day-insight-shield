
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
        <img 
          src="/lovable-uploads/63cf3b7b-1fc0-417b-a6dd-70515bd126c8.png"
          alt="CCR Scanner Logo" 
          className={cn(sizeClasses[size])}
        />
      </div>
    </div>
  );
};
