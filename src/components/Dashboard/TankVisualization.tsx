import { cn } from "@/lib/utils";

interface TankVisualizationProps {
  waterLevel: number;
  isWarning: boolean;
}

export const TankVisualization = ({ waterLevel, isWarning }: TankVisualizationProps) => {
  const petrolLevel = 100 - waterLevel;
  
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative bg-gradient-to-b from-gray-300 to-gray-400 rounded-3xl p-4 shadow-inner" style={{ height: "400px" }}>
        {/* Tank walls */}
        <div className="absolute inset-4 border-4 border-gray-500 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-900/10 to-blue-900/20">
          
          {/* Petrol layer (top) */}
          <div 
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-500 to-amber-600 transition-all duration-1000 ease-out"
            style={{ height: `${petrolLevel}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
          </div>
          
          {/* Water layer (bottom) with wave animation */}
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out",
              isWarning ? "bg-gradient-to-b from-red-600 to-red-700" : "bg-gradient-to-b from-blue-500 to-blue-700"
            )}
            style={{ height: `${waterLevel}%` }}
          >
            {/* Wave effect at the surface */}
            <div className="absolute top-0 left-0 right-0 h-4 liquid-wave">
              <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 100"
                preserveAspectRatio="none"
              >
                <path
                  fill={isWarning ? "#dc2626" : "#3b82f6"}
                  d="M0,50 Q360,20 720,50 T1440,50 L1440,100 L0,100 Z"
                >
                  <animate
                    attributeName="d"
                    dur="3s"
                    repeatCount="indefinite"
                    values="
                      M0,50 Q360,20 720,50 T1440,50 L1440,100 L0,100 Z;
                      M0,50 Q360,80 720,50 T1440,50 L1440,100 L0,100 Z;
                      M0,50 Q360,20 720,50 T1440,50 L1440,100 L0,100 Z
                    "
                  />
                </path>
              </svg>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
          </div>
          
          {/* Level markers */}
          {[25, 50, 75].map((level) => (
            <div
              key={level}
              className="absolute left-0 right-0 border-t border-white/30 flex items-center"
              style={{ top: `${100 - level}%` }}
            >
              <span className="ml-2 text-xs text-white/70 font-mono">{level}%</span>
            </div>
          ))}
        </div>
        
        {/* Percentage display */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-card border-2 border-primary shadow-lg rounded-full px-4 py-1">
          <span className="text-sm font-bold text-primary">{waterLevel.toFixed(1)}%</span>
        </div>
      </div>
      
      {/* Labels */}
      <div className="mt-4 flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-600"></div>
          <span className="text-muted-foreground">Petrol: {petrolLevel.toFixed(1)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-4 h-4 rounded-full",
            isWarning ? "bg-gradient-to-br from-red-600 to-red-700" : "bg-gradient-to-br from-blue-500 to-blue-700"
          )}></div>
          <span className="text-muted-foreground">Water: {waterLevel.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};
