
import React, { useState, createContext, useContext } from 'react';
import { ChevronDown } from 'lucide-react';

// Context to manage accordion state
type AccordionContextType = {
  openItems: string[];
  toggleItem: (itemId: string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion component');
  }
  return context;
}

// Accordion container
interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  children: React.ReactNode;
}

export const Accordion = ({ 
  type = 'single',
  defaultValue = [],
  children,
  className = '',
  ...props 
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );

  const toggleItem = (itemId: string) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(itemId) ? [] : [itemId]);
    } else {
      setOpenItems(
        openItems.includes(itemId)
          ? openItems.filter(id => id !== itemId)
          : [...openItems, itemId]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={`space-y-1 ${className}`} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Accordion Item
interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export const AccordionItem = ({ 
  value, 
  children, 
  className = '', 
  ...props 
}: AccordionItemProps) => {
  const { openItems } = useAccordionContext();
  const isOpen = openItems.includes(value);

  return (
    <div 
      data-state={isOpen ? 'open' : 'closed'}
      className={`border-b ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Accordion Trigger
interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const AccordionTrigger = ({ 
  children, 
  className = '', 
  ...props 
}: AccordionTriggerProps) => {
  const { openItems, toggleItem } = useAccordionContext();
  const itemId = props.id || '';

  return (
    <h3 className="flex">
      <button
        type="button"
        aria-expanded={openItems.includes(itemId)}
        className={`flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline ${className}`}
        onClick={() => toggleItem(itemId)}
        {...props}
      >
        {children}
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
          openItems.includes(itemId) ? 'rotate-180' : ''
        }`} />
      </button>
    </h3>
  );
};

// Accordion Content
interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const AccordionContent = ({ 
  children, 
  className = '', 
  ...props 
}: AccordionContentProps) => {
  const { openItems } = useAccordionContext();
  const itemId = props.id?.split('-content')[0] || '';
  const isOpen = openItems.includes(itemId);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={`overflow-hidden text-sm ${className}`}
      {...props}
    >
      <div className="pb-4 pt-0">
        {children}
      </div>
    </div>
  );
};
