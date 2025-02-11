import { memo, useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface RangeSliderProps {
  label?: string;
  min?: number;
  max?: number;
  value?: number[];
  step?: number;
  onChange: (value: number[]) => void;
  className?: string;
  disabled?: boolean;
  showTooltip?: boolean;
  tooltipFormatter?: (value: number) => string;
  trackColor?: string;
  thumbColor?: string;
}

const RangeSlider = ({
  label = "Range Slider",
  min = 0,
  max = 100,
  value = [min, max],
  step = 1,
  onChange,
  className = "",
  disabled = false,
  showTooltip = true,
  tooltipFormatter = (val) => val.toString(),
  trackColor = "bg-blue-500",
  thumbColor = "bg-white border border-gray-300",
}: RangeSliderProps) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (trackRef.current) {
      const minPercent = ((minValue - min) / (max - min)) * 100;
      const maxPercent = ((maxValue - min) / (max - min)) * 100;
      trackRef.current.style.left = `${minPercent}%`;
      trackRef.current.style.right = `${100 - maxPercent}%`;
    }
  }, [minValue, maxValue, min, max]);

  const handleChange = (value: number, type: "min" | "max") => {
    if (type === "min" && value <= maxValue) {
      setMinValue(value);
      onChange([value, maxValue]);
    } else if (type === "max" && value >= minValue) {
      setMaxValue(value);
      onChange([minValue, value]);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const slider = trackRef.current?.parentElement;
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const value = Math.round(min + percent * (max - min));
    handleChange(value, dragging);
  };

  const handleMouseUp = () => setDragging(null);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div className={clsx("w-full flex flex-col gap-2", className)}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="relative w-full h-10 flex items-center">
        <div
          ref={trackRef}
          className={clsx("absolute h-2 rounded-md transition-all duration-300", trackColor)}
        ></div>
        {/* Custom thumbs */}
        <div
          className={clsx("absolute w-5 h-5 rounded-full cursor-pointer transition-all duration-200", thumbColor)}
          style={{ left: `${((minValue - min) / (max - min)) * 100}%`, transform: "translateX(-50%)" }}
          onMouseDown={() => setDragging("min")}
        >
          {showTooltip && (
            <div className="text-xs bg-gray-700 text-white px-2 py-1 rounded absolute bottom-full mb-1">
              {tooltipFormatter(minValue)}
            </div>
          )}
        </div>
        <div
          className={clsx("absolute w-5 h-5 rounded-full cursor-pointer transition-all duration-200", thumbColor)}
          style={{ left: `${((maxValue - min) / (max - min)) * 100}%`, transform: "translateX(-50%)" }}
          onMouseDown={() => setDragging("max")}
        >
          {showTooltip && (
            <div className="text-xs bg-gray-700 text-white px-2 py-1 rounded absolute bottom-full mb-1">
              {tooltipFormatter(maxValue)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(RangeSlider);
