
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
        src="/lovable-uploads/80445cee-32ec-4e5b-a2cd-f746a3e1cd7c.png"
        alt="CCR Scanner Logo" 
        className={cn(sizeClasses[size])}
      />
    </div>
  );
};
