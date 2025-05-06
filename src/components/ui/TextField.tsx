import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      helperText,
      error = false,
      fullWidth = false,
      variant = 'outlined',
      className = '',
      required = false,
      type = 'text',
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const getVariantClasses = () => {
      switch (variant) {
        case 'filled':
          return 'bg-gray-100 border-transparent focus:bg-white';
        case 'standard':
          return 'border-b-2 border-gray-300 rounded-none px-0 focus:border-indigo-500';
        case 'outlined':
        default:
          return 'bg-white border-gray-300 hover:border-gray-400';
      }
    };

    const errorClasses = error
      ? 'border-rose-500 text-rose-500 focus:border-rose-500 focus:ring-rose-500'
      : 'focus:border-indigo-500 focus:ring-indigo-500';

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label
            className={`block text-sm font-medium mb-1 ${
              error ? 'text-rose-500' : 'text-gray-700'
            }`}
          >
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`
              block rounded-lg transition-all
              border focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${getVariantClasses()}
              ${errorClasses}
              ${startIcon ? 'pl-10' : 'pl-4'}
              ${isPassword || endIcon ? 'pr-10' : 'pr-4'}
              ${fullWidth ? 'w-full' : ''}
              py-2 text-sm
            `}
            required={required}
            {...props}
          />
          {(isPassword || endIcon) && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              ) : (
                endIcon
              )}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={`mt-1 text-xs ${
              error ? 'text-rose-500' : 'text-gray-500'
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;