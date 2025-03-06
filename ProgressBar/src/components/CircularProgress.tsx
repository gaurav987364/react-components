import { clampValue, getPercentage } from "../utils/helper";
import { ProgressBarProps } from "../utils/type";

const CircularProgress: React.FC<ProgressBarProps & { strokeWidth?: number }> = ({
  value,
  min = 0,
  max = 100,
  size = 'md',
  color = 'text-blue-500',
  strokeWidth = 8,
  className = '',
  label,
  showValue = false,
  ariaLabel = 'Circular progress',
  transition = 'transition-all duration-300',
}) => {
  const percentage = getPercentage(value, min, max);
  const clampedValue = clampValue(value, min, max);
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };

  return (
    <div 
      className={`relative inline-block ${sizeClasses[size]} ${className}`}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={ariaLabel}
    >
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          className="stroke-current text-gray-200"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          className={`stroke-current ${color} ${transition}`}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          {typeof label === 'function' 
            ? label(clampedValue)
            : label ?? `${Math.round(percentage)}%`}
        </div>
      )}
    </div>
  );
};


export default CircularProgress;