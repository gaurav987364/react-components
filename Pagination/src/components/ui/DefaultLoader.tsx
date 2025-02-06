

// Loader.tsx
import React from 'react';

export type LoaderType = 
  | 'spinner' 
  | 'skeleton' 
  | 'dots' 
  | 'shimmer'
  | 'progress';

export interface LoaderProps {
  type?: LoaderType;
  color?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  skeletonCount?: number;
  customLoader?: React.ReactNode;
  ariaLabel?: string;
}

const DefaultLoader: React.FC<LoaderProps> = ({
  type = 'spinner',
  color = '#4f46e5',
  size = 50,
  className = '',
  style,
  skeletonCount = 3,
  customLoader,
  ariaLabel = 'Loading...'
}) => {
  const renderSpinner = () => (
    <div 
      className="spinner" 
      style={{ 
        width: size, 
        height: size, 
        borderColor: color 
      }}
    />
  );

  const renderSkeleton = () => (
    <div className="skeleton-container">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <div 
          key={i} 
          className="skeleton-line" 
          style={{ 
            width: `${100 - (i * 10)}%`, 
            height: size / 2 
          }}
        />
      ))}
    </div>
  );

  const renderDots = () => (
    <div className="dots-container" style={{ width: size * 3 }}>
      {[...Array(3)].map((_, i) => (
        <div 
          key={i}
          className="dot" 
          style={{ 
            width: size / 3, 
            height: size / 3, 
            backgroundColor: color 
          }}
        />
      ))}
    </div>
  );

  const renderShimmer = () => (
    <div className="shimmer-container">
      <div 
        className="shimmer" 
        style={{ 
          height: size * 2,
          background: `linear-gradient(90deg, transparent 0%, ${color}20 50%, transparent 100%)`
        }}
      />
    </div>
  );

  const renderProgress = () => (
    <div className="progress-container" style={{ width: size * 4 }}>
      <div 
        className="progress-bar" 
        style={{ 
          height: size / 4, 
          backgroundColor: color 
        }}
      />
    </div>
  );

  const loaderComponents = {
    spinner: renderSpinner(),
    skeleton: renderSkeleton(),
    dots: renderDots(),
    shimmer: renderShimmer(),
    progress: renderProgress()
  };

  return (
    <div 
      className={`loader ${className}`}
      style={style}
      role="status"
      aria-label={ariaLabel}
    >
      {customLoader || loaderComponents[type]}
    </div>
  );
};

export default DefaultLoader;