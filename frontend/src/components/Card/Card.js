
export const Card = ({ children, className = '' }) => {
    return (
      <div className={`bg-white rounded-lg shadow-md ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardHeader = ({ children, className = '' }) => {
    return (
      <div className={`p-6 ${className}`}>
        {children}
      </div>
    );
  };
  
  export const CardTitle = ({ children, className = '' }) => {
    return (
      <h2 className={`text-2xl font-bold text-gray-900 ${className}`}>
        {children}
      </h2>
    );
  };
  
  export const CardDescription = ({ children, className = '' }) => {
    return (
      <p className={`mt-2 text-gray-600 ${className}`}>
        {children}
      </p>
    );
  };
  
  export const CardContent = ({ children, className = '' }) => {
    return (
      <div className={`p-6 pt-0 ${className}`}>
        {children}
      </div>
    );
  };
  
  // components/Switch.js
  export const Switch = ({ checked, onCheckedChange, className = '' }) => {
    return (
      <label className={`relative inline-block w-14 h-7 ${className}`}>
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={() => onCheckedChange(!checked)}
        />
        <span className={`
          absolute cursor-pointer inset-0 rounded-full 
          ${checked ? 'bg-blue-600' : 'bg-gray-200'}
          transition-colors duration-200
        `}>
          <span className={`
            absolute w-5 h-5 bg-white rounded-full 
            transform transition-transform duration-200
            ${checked ? 'translate-x-7' : 'translate-x-1'}
            top-1
          `} />
        </span>
      </label>
    );
  };
  
  // components/Input.js
  export const Input = ({ type = 'text', value, onChange, placeholder, className = '' }) => {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          placeholder-gray-400
          ${className}
        `}
      />
    );
  };
  
  // components/Button.js
  export const Button = ({ 
    children, 
    variant = 'primary', 
    onClick, 
    className = '' 
  }) => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700'
    };
  
    return (
      <button
        onClick={onClick}
        className={`
          px-4 py-2 rounded-md font-medium
          transition-colors duration-200
          ${variants[variant]}
          ${className}
        `}
      >
        {children}
      </button>
    );
  };
  
  // components/Toast.js
  export const Toast = ({ message, type = 'success', onClose }) => {
    return (
      <div className={`
        fixed bottom-4 right-4 p-4 rounded-md shadow-lg
        transition-opacity duration-300
        ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}
        text-white
      `}>
        {message}
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    );
  };
  
  // hooks/useToast.js
  import { useState } from 'react';
  
  export const useToast = () => {
    const [toast, setToast] = useState(null);
  
    const showToast = ({ title, description, variant = 'success' }) => {
      setToast({ message: `${title}: ${description}`, type: variant });
      setTimeout(() => setToast(null), 3000);
    };
  
    return {
      toast: showToast,
      ToastComponent: toast ? (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      ) : null
    };
  };