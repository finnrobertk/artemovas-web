import { FC } from 'react';

interface SeparatorProps {
  className?: string;
  text?: string;
  height?: string | number;
}

// Helper function to process height value
const getHeightClass = (height?: string | number): string => {
  if (!height) return 'h-px'; // default height
  
  // If it's a number, assume pixels
  if (typeof height === 'number') return `h-[${height}px]`;
  
  // If it starts with h-, assume it's a Tailwind class
  if (height.startsWith('h-')) return height;
  
  // Otherwise, treat as a CSS value
  return `h-[${height}]`;
};

export const SimpleSeparator: FC<SeparatorProps> = ({ className = '', height }) => (
  <div 
    className={`bg-gold-simple w-full my-8 ${className}`} 
    style={{ height: height ? (typeof height === 'number' ? `${height}px` : height) : '1px' }}
  />
);

export const FancySeparator: FC<SeparatorProps> = ({ className = '', text, height }) => (
  <div className={`flex items-center gap-4 my-8 ${className}`}>
    <div 
      className="bg-gold-gradient flex-1"
      style={{ height: height ? (typeof height === 'number' ? `${height}px` : height) : '1px' }}
    />
    {text && (
      <span className="text-text font-serif whitespace-nowrap">
        {text}
      </span>
    )}
    <div 
      className="bg-gold-gradient flex-1"
      style={{ height: height ? (typeof height === 'number' ? `${height}px` : height) : '1px' }}
    />
  </div>
);

export const SubtleSeparator: FC<SeparatorProps> = ({ className = '', height }) => (
  <div 
    className={`bg-gold-subtle w-full my-6 ${className}`}
    style={{ height: height ? (typeof height === 'number' ? `${height}px` : height) : '2px' }}
  />
);

export const VerticalSeparator: FC<SeparatorProps> = ({ className = '', height }) => (
  <div 
    className={`w-px bg-gold-gradient-vertical ${className}`}
    style={{ height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%' }}
  />
);

export const DecorativeSeparator: FC<SeparatorProps> = ({ className = '', height }) => {
  const lineHeight = height ? (typeof height === 'number' ? `${height}px` : height) : '1px';
  const diamondSize = height ? (typeof height === 'number' ? `${height * 4}px` : `calc(${height} * 4)`) : '1rem';
  
  return (
    <div className={`relative w-full my-8 ${className}`} style={{ height: lineHeight }}>
      <div className="absolute inset-0 bg-gold-gradient" />
      <div 
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold-simple"
        style={{ width: diamondSize, height: diamondSize }}
      />
    </div>
  );
};

// Export a default object with all separators for convenience
const Separator = {
  Simple: SimpleSeparator,
  Fancy: FancySeparator,
  Subtle: SubtleSeparator,
  Vertical: VerticalSeparator,
  Decorative: DecorativeSeparator,
};

export default Separator; 