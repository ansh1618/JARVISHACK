import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ImpactCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
  color: "green" | "blue" | "amber";
  delay?: number;
}

export const ImpactCounter = ({ 
  value, 
  suffix = "", 
  label, 
  icon, 
  color,
  delay = 0 
}: ImpactCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  const colorClasses = {
    green: "from-impact-green/20 to-impact-green/5 border-impact-green/30 text-impact-green",
    blue: "from-impact-blue/20 to-impact-blue/5 border-impact-blue/30 text-impact-blue",
    amber: "from-impact-amber/20 to-impact-amber/5 border-impact-amber/30 text-impact-amber",
  };

  return (
    <div className={cn(
      "relative p-6 rounded-2xl border bg-gradient-to-br transition-all duration-500",
      colorClasses[color],
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-card shadow-soft">
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-4xl font-display font-bold tracking-tight">
          {count.toLocaleString()}{suffix}
        </p>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};
