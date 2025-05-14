
import { cn } from "@/lib/utils";

interface CcrLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Empty logo component since we're removing all CYBER CREW logos
export const CcrLogo = ({ size = "md", className }: CcrLogoProps) => {
  return <div className={cn(className)} />;
};
