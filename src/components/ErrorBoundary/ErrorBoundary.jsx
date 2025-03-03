import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto p-6 text-center">
          <h4 className="text-2xl text-red-600 font-semibold">
            Algo salió mal... por favor intenta de nuevo más tarde
          </h4>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
