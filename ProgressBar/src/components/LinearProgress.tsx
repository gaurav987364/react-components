import React, { memo } from 'react'
import { ProgressBarProps } from '../utils/type'
import { clampValue, getPercentage } from '../utils/helper';

const LinearProgress : React.FC<ProgressBarProps> = ({
    value,
    min = 0,
    max = 100,
    size = "md",
    color = "bg-blue-500",
    className = "",
    label,
    showValue = false,
    ariaLabel = "Progress",
    transition = "transition-all duration-300"
}) => {
    const percentage = getPercentage(value, min, max);
    const clampedValue = clampValue(value, min, max);

    const sizeClasses = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
    };
  return (
    <div className={` w-full ${sizeClasses[size]} bg-gray-200 rounded-full ${className}`}
     role='progressbar'
     aria-valuemax={max}
     aria-valuenow={clampedValue}
     aria-label={ariaLabel}
     aria-valuemin={min}
    >
        <div 
            className={` h-full rounded-full overflow-hidden ${color} ${transition}`}
            style={{width : `${percentage}%`}}
        >
        </div>
        {showValue && (
            <div className=' text-center font-semibold text-black text-xs line-clamp-1'>
                {typeof label === 'function' ? label(clampedValue) : label ?? `${percentage}%`}
            </div>
        )}
    </div>
  )
}

export default memo(LinearProgress);