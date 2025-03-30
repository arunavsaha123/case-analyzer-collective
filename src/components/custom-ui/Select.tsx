
import React, { createContext, useContext, useState } from 'react';
import { ChevronDown } from 'lucide-react';

type SelectContextType = {
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select component');
  }
  return context;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Select = ({ value, onValueChange, children }: SelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, onChange: onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className = '', children, ...props }, ref) => {
    const { setOpen, open } = useSelectContext();

    return (
      <button
        ref={ref}
        className={`flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        onClick={() => setOpen(!open)}
        {...props}
        type="button"
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { value } = useSelectContext();
  
  return <span className="text-sm">{value || placeholder}</span>;
};

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className = '', children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext();

    if (!open) return null;

    return (
      <>
        <div
          className="fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        />
        <div
          ref={ref}
          className={`absolute z-40 mt-1 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md ${className}`}
          {...props}
        >
          <div className="max-h-72 overflow-y-auto">{children}</div>
        </div>
      </>
    );
  }
);
SelectContent.displayName = 'SelectContent';

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className = '', children, value, ...props }, ref) => {
    const { onChange, value: selectedValue, setOpen } = useSelectContext();
    
    const isSelected = selectedValue === value;

    return (
      <div
        ref={ref}
        className={`relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 ${
          isSelected ? 'bg-gray-100' : ''
        } ${className}`}
        onClick={() => {
          onChange(value);
          setOpen(false);
        }}
        {...props}
      >
        <span className={`absolute left-2 flex h-3.5 w-3.5 items-center justify-center ${isSelected ? 'text-blue-600' : 'text-transparent'}`}>
          {isSelected && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </span>
        <span>{children}</span>
      </div>
    );
  }
);
SelectItem.displayName = 'SelectItem';
