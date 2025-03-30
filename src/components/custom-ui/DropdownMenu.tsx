
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

// Types
interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

// Context
type DropdownContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement>;
};

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);

// Hook
const useDropdownContext = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a DropdownMenu component');
  }
  return context;
};

// Components
export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({ 
  children, 
  asChild = false 
}) => {
  const { open, setOpen, triggerRef } = useDropdownContext();
  
  const handleClick = () => {
    setOpen(!open);
  };

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: handleClick,
      'aria-expanded': open,
      'aria-haspopup': true,
      ref: triggerRef
    });
  }

  return (
    <button 
      type="button"
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="true"
      ref={triggerRef}
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({ 
  children, 
  className = '',
  align = 'center',
  sideOffset = 4
}) => {
  const { open, setOpen, triggerRef } = useDropdownContext();
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current && 
        !contentRef.current.contains(event.target as Node) && 
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, setOpen, triggerRef]);
  
  if (!open) return null;
  
  // Calculate position
  let alignClass = 'left-1/2 transform -translate-x-1/2'; // center
  if (align === 'start') alignClass = 'left-0';
  if (align === 'end') alignClass = 'right-0';

  return (
    <div
      className={`absolute z-50 mt-${sideOffset} min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md ${alignClass} ${className}`}
      ref={contentRef}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  className = '', 
  onClick,
  disabled = false
}) => {
  const { setOpen } = useDropdownContext();
  
  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    setOpen(false);
  };
  
  return (
    <div
      className={`relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 ${
        disabled ? 'cursor-not-allowed opacity-50' : ''
      } ${className}`}
      onClick={handleClick}
      role="menuitem"
    >
      {children}
    </div>
  );
};

export const DropdownMenuSeparator: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`-mx-1 my-1 h-px bg-gray-200 ${className}`} />;
};

export const DropdownMenuLabel: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '',
  children
}) => {
  return (
    <div className={`px-2 py-1.5 text-sm font-semibold ${className}`}>
      {children}
    </div>
  );
};

export const DropdownMenuSub: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  
  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownMenuSubTrigger: React.FC<DropdownMenuItemProps> = ({ 
  children, 
  className = '' 
}) => {
  const { setOpen } = useDropdownContext();
  
  return (
    <div
      className={`flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </div>
  );
};

export const DropdownMenuSubContent: React.FC<DropdownMenuContentProps> = ({ 
  children, 
  className = '' 
}) => {
  const { open } = useDropdownContext();
  
  if (!open) return null;
  
  return (
    <div
      className={`absolute left-full top-0 z-50 mt-0 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md ${className}`}
    >
      {children}
    </div>
  );
};
