// src/components/ui/Card.jsx
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-white shadow-lg rounded-2xl border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 sm:px-8 ${className}`}>
      {children}
    </div>
  );
};