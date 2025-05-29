 // src/components/ui/Card.jsx
 export const Card = ({ children, className = '', ...props }) => {
    return (
      <div 
        className={`bg-white shadow rounded-lg ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className = '' }) => {
    return (
      <div className={`px-4 py-5 sm:px-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardContent = ({ children, className = '' }) => {
    return (
      <div className={`px-4 py-5 sm:p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardFooter = ({ children, className = '' }) => {
    return (
      <div className={`px-4 py-4 sm:px-6 ${className}`}>
        {children}
      </div>
    );
  };
  