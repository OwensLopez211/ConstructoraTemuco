
// src/components/ui/Input.jsx
export const Input = ({ 
  label, 
  error, 
  className = '', 
  required = false,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-800">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          block w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm
          placeholder-gray-400 text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
          transition-all duration-200 ease-in-out
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500 bg-red-50/30' : 'bg-gray-50/50 focus:bg-white'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 font-medium flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;