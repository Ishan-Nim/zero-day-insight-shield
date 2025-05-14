
import { cn } from "@/lib/utils";

interface CcrLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const CcrLogo = ({ size = "md", className }: CcrLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl"
  };

  return (
    <div className={cn("flex items-center", className)}>
      <h1 className={cn("font-extrabold uppercase tracking-wider text-[#00b3b0]", sizeClasses[size])}>
        CYBER CREW
      </h1>
    </div>
  );
}
