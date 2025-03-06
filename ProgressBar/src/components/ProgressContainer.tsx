import { ProgressBarProps, ProgressVariant } from '../utils/type';
import CircularProgress from './CircularProgress';
import IndeterminateProgress from './IndeterminateProgress';
import LinearProgress from './LinearProgress';

const Progress: React.FC<ProgressBarProps & { variant?: ProgressVariant }> = ({
  variant = 'linear',
  ...props
}) => {
  switch (variant) {
    case 'circular':
      return <CircularProgress {...props} />;
    case 'indeterminate':
      return <IndeterminateProgress {...props} />;
    default:
      return <LinearProgress {...props} />;
  }
};

export default Progress;