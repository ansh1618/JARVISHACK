import { cn } from "@/lib/utils";

interface SDGBadgeProps {
  number: number;
  title: string;
  className?: string;
}

const sdgColors: Record<number, string> = {
  2: "bg-amber-500",
  12: "bg-amber-600", 
  13: "bg-emerald-600",
};

export const SDGBadge = ({ number, title, className }: SDGBadgeProps) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
      sdgColors[number] || "bg-primary",
      "text-primary-foreground shadow-soft",
      className
    )}>
      <span className="font-bold">SDG {number}</span>
      <span className="opacity-90">|</span>
      <span>{title}</span>
    </div>
  );
};
