
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface CcrLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CcrLogo = ({ size = "md", className }: CcrLogoProps) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-3xl"
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Shield className="text-[#00b3b0]" size={iconSizes[size]} />
      <div className="font-bold tracking-tight">
        <span>CCR</span>
        <span className="text-[#00b3b0]">Scanner</span>
      </div>
    </div>
  );
};
