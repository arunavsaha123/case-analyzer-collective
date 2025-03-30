
import React, { useState, useRef, useEffect } from 'react';

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className = '', value, min = 0, max = 100, step = 1, onValueChange, ...props }, ref) => {
    const railRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [activeThumb, setActiveThumb] = useState<number | null>(null);
    const [localValue, setLocalValue] = useState<number[]>(value);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleMouseDown = (e: React.MouseEvent, index: number) => {
      setIsDragging(true);
      setActiveThumb(index);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || activeThumb === null || !railRef.current) return;
      
      const rect = railRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const rawValue = min + percent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));
      
      const newValue = [...localValue];
      newValue[activeThumb] = clampedValue;
      
      // Ensure thumbs don't cross
      if (activeThumb === 0 && newValue[0] > newValue[1]) {
        newValue[0] = newValue[1];
      } else if (activeThumb === 1 && newValue[1] < newValue[0]) {
        newValue[1] = newValue[0];
      }
      
      setLocalValue(newValue);
      onValueChange?.(newValue);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveThumb(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const getThumbPosition = (value: number): string => {
      return `${((value - min) / (max - min)) * 100}%`;
    };

    return (
      <div
        ref={ref}
        className={`relative w-full h-5 flex items-center ${className}`}
        {...props}
      >
        <div 
          ref={railRef}
          className="w-full h-1.5 bg-gray-200 rounded-full"
        >
          <div
            className="absolute h-1.5 bg-blue-600 rounded-full"
            style={{
              left: getThumbPosition(localValue[0]),
              right: `calc(100% - ${getThumbPosition(localValue[1])})`,
            }}
          />
          {localValue.map((val, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 bg-white rounded-full shadow-md border-2 border-blue-600 transform -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-pointer hover:scale-110 transition-transform ${
                isDragging && activeThumb === i ? 'scale-110' : ''
              }`}
              style={{ left: getThumbPosition(val) }}
              onMouseDown={(e) => handleMouseDown(e, i)}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={val}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
