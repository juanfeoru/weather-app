import { Component, type ErrorInfo, type ReactNode } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-[400px] flex items-center justify-center p-4'>
          <Card className='max-w-md w-full text-center space-y-6'>
            <h2 className='text-2xl font-bold text-white'>Something went wrong</h2>
            <p className='text-neutral-400'>
              The application encountered an unexpected error. Please try refreshing the page.
            </p>
            <Button 
              onClick={() => window.location.reload()}
              className='w-full'
            >
              Refresh Page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
