// src/components/ErrorBanner.tsx
import React from 'react';

interface ErrorBannerProps {
  message: string;
}

const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
  return (
    <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', marginBottom: '10px' }}>
      Error: {message}
    </div>
  );
};

export default ErrorBanner;
