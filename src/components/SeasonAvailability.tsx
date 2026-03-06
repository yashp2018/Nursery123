import { Check, X } from "lucide-react";

interface SeasonAvailabilityProps {
  availableMonths: number[]; // Array of month numbers (0-11)
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function SeasonAvailability({ availableMonths }: SeasonAvailabilityProps) {
  return (
    <div className="bg-muted/30 rounded-xl p-4">
      <h4 className="text-sm font-semibold text-foreground mb-3">Season/Availability:</h4>
      <div className="grid grid-cols-12 gap-1">
        {months.map((month, index) => {
          const isAvailable = availableMonths.includes(index);
          return (
            <div key={month} className="flex flex-col items-center">
              <div
                className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-colors ${
                  isAvailable
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isAvailable ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              </div>
              <span className="text-[10px] text-muted-foreground mt-1">{month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
