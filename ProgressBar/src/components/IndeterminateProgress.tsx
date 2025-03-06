// For indeterminate variant
const IndeterminateProgress = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={`relative overflow-hidden ${className}`}>
    {children || <div className="absolute w-1/2 h-full bg-blue-500 progress-indeterminate" />}
  </div>
);

export default IndeterminateProgress;
  


// const colorThemes = {
//     primary: 'bg-blue-500',
//     success: 'bg-green-500',
//     warning: 'bg-yellow-500',
//     error: 'bg-red-500',
//   };
  
//   // Use in component:
//   const colorClass = colorThemes[props.color] || props.color;