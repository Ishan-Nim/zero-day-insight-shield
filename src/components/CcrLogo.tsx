
import { cn } from "@/lib/utils";

interface CcrLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CcrLogo = ({ size = "md", className }: CcrLogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src="/lovable-uploads/78b3785a-a7ae-4ef2-9d5b-0d45f0ab6663.png" 
        alt="Cyber Crew" 
        className={cn(sizeClasses[size], "w-auto")} 
      />
    </div>
  );
};
