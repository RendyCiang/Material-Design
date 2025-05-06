import React, { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disableElevation?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'contained',
      size = 'medium',
      fullWidth = false,
      color = 'primary',
      className = '',
      startIcon,
      endIcon,
      disableElevation = false,
      loading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const colorStyles = {
      primary: {
        contained: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        outlined: 'border-indigo-600 text-indigo-600 hover:bg-indigo-50',
        text: 'text-indigo-600 hover:bg-indigo-50',
      },
      secondary: {
        contained: 'bg-teal-600 hover:bg-teal-700 text-white',
        outlined: 'border-teal-600 text-teal-600 hover:bg-teal-50',
        text: 'text-teal-600 hover:bg-teal-50',
      },
      error: {
        contained: 'bg-rose-600 hover:bg-rose-700 text-white',
        outlined: 'border-rose-600 text-rose-600 hover:bg-rose-50',
        text: 'text-rose-600 hover:bg-rose-50',
      },
      success: {
        contained: 'bg-green-600 hover:bg-green-700 text-white',
        outlined: 'border-green-600 text-green-600 hover:bg-green-50',
        text: 'text-green-600 hover:bg-green-50',
      },
      warning: {
        contained: 'bg-amber-600 hover:bg-amber-700 text-white',
        outlined: 'border-amber-600 text-amber-600 hover:bg-amber-50',
        text: 'text-amber-600 hover:bg-amber-50',
      },
    };

    const sizeStyles = {
      small: 'text-xs px-3 py-1.5',
      medium: 'text-sm px-4 py-2',
      large: 'text-base px-6 py-3',
    };

    const getVariantClasses = () => {
      switch (variant) {
        case 'outlined':
          return 'border-2 bg-transparent';
        case 'text':
          return 'border-0 bg-transparent';
        case 'contained':
        default:
          return '';
      }
    };

    const baseClasses =
      'rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center';
    const widthClass = fullWidth ? 'w-full' : '';
    const elevationClass = !disableElevation && variant === 'contained' ? 'shadow-md' : '';
    const disabledClass =
      disabled || loading
        ? 'opacity-50 cursor-not-allowed'
        : 'transform active:scale-[0.98] hover:-translate-y-0.5';

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`
          ${baseClasses}
          ${getVariantClasses()}
          ${colorStyles[color][variant]}
          ${sizeStyles[size]}
          ${widthClass}
          ${elevationClass}
          ${disabledClass}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {startIcon && !loading && <span className="mr-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;