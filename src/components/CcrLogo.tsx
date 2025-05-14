
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
      <img 
        src="/lovable-uploads/d04b325d-bd11-40fc-83cf-27788bf96a6d.png"
        alt="CCR Scanner Logo" 
        className={cn(sizeClasses[size])}
      />
    </div>
  );
};
