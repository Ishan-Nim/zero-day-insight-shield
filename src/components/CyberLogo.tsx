
import { cn } from "@/lib/utils";

interface CyberLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CyberLogo = ({ size = "lg", className }: CyberLogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img 
        src="/lovable-uploads/96977d50-85ec-4769-bc4c-8a12d3822830.png" 
        alt="ZeroDay"
        className={cn(sizeClasses[size], "w-auto")} 
      />
    </div>
  );
};
