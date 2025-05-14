
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle } from "lucide-react";

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
    console.error("Uncaught error:", error, errorInfo);
    
    // In production, you could send this to an error tracking service
    if (import.meta.env.PROD) {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
          <div className="w-full max-w-md text-center space-y-6">
            <Shield className="h-16 w-16 mx-auto text-primary" />
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Something went wrong</h1>
              <p className="text-muted-foreground">
                We apologize for the inconvenience. Our team has been notified about this issue.
              </p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md text-left">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">{this.state.error?.name || "Error"}</p>
                  <p className="text-xs text-muted-foreground break-words">
                    {this.state.error?.message || "An unknown error occurred"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-x-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
              >
                Go back home
              </Button>
              
              <Button 
                onClick={() => window.location.reload()}
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
