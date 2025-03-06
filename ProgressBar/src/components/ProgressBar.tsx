import React from "react";

interface ProgressBarProps {
  progress?: number; // Optional, for indeterminate mode
  width?: string;
  height?: string;
  backgroundColor?: string;
  progressColor?: string;
  borderRadius?: string;
  showValue?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
  indeterminate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress = 0,
  width = "100%",
  height = "10px",
  backgroundColor = "#E5E7EB",
  progressColor = "#3B82F6",
  borderRadius = "6px",
  showValue = false,
  showLabel = false,
  label = "Progress",
  className = "",
  indeterminate = false,
}) => {
  return (
    <div className={`w-full ${className}`} style={{ width }}>
      {showLabel && <span className="block mb-1 text-sm font-medium">{label}</span>}
      <div
        className="relative w-full overflow-hidden"
        style={{ backgroundColor, borderRadius, height }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : progress}
      >
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-500 ease-in-out ${
            indeterminate ? "animate-pulse" : ""
          }`}
          style={{
            width: indeterminate ? "50%" : `${progress}%`,
            backgroundColor: progressColor,
            borderRadius,
            animation: indeterminate ? "indeterminate 1.5s infinite linear" : "none",
          }}
        />
      </div>
      {showValue && !indeterminate && (
        <div className="mt-1 text-xs text-center font-medium">{progress}%</div>
      )}
      <style>
        {`
          @keyframes indeterminate {
            0% { left: -50%; width: 50%; }
            50% { left: 25%; width: 50%; }
            100% { left: 100%; width: 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default ProgressBar;
