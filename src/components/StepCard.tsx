import { cn } from "@/lib/utils";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLast?: boolean;
}

export const StepCard = ({ number, title, description, icon, isLast = false }: StepCardProps) => {
  return (
    <div className="relative flex gap-6">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-glow">
          {number}
        </div>
        {!isLast && (
          <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-primary/10 mt-4" />
        )}
      </div>

      {/* Content */}
      <div className={cn("pb-12", isLast && "pb-0")}>
        <div className="p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-secondary/10">
              {icon}
            </div>
            <h3 className="font-display font-semibold text-lg">{title}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
