import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 0 | 1 | 2 | 3;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  elevation = 1,
  onClick,
}) => {
  const elevationClasses = {
    0: 'shadow-none',
    1: 'shadow',
    2: 'shadow-md',
    3: 'shadow-lg',
  };

  return (
    <div
      className={`
        bg-white rounded-lg overflow-hidden
        ${elevationClasses[elevation]}
        ${onClick ? 'cursor-pointer transition hover:-translate-y-1 hover:shadow-lg' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardMedia: React.FC<{
  image: string;
  alt?: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '2/3';
}> = ({ image, alt = '', className = '', aspectRatio = '16/9' }) => {
  const aspectRatioClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '2/3': 'aspect-[2/3]',
  };

  return (
    <div className={`${aspectRatioClasses[aspectRatio]} overflow-hidden ${className}`}>
      <img
        src={image}
        alt={alt}
        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
      />
    </div>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const CardActions: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableSpacing?: boolean;
}> = ({ children, className = '', disableSpacing = false }) => {
  return (
    <div
      className={`
        p-4 pt-0 flex items-center
        ${!disableSpacing ? 'space-x-2' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;