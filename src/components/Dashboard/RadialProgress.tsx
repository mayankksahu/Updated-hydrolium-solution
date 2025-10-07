interface RadialProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export const RadialProgress = ({ value, size = 200, strokeWidth = 12 }: RadialProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = (val: number) => {
    if (val <= 16) return "hsl(142 76% 36%)"; // success
    if (val <= 20) return "hsl(38 92% 50%)"; // warning
    return "hsl(0 84% 60%)"; // danger
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor(value)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${getColor(value)})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-extrabold text-accent">
          {value.toFixed(1)}
        </span>
        <span className="text-xl font-semibold text-accent">%</span>
        <span className="text-sm text-muted-foreground mt-1">Water</span>
      </div>
    </div>
  );
};
