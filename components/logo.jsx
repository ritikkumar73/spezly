import React from 'react';
import Link from 'next/link';

const Logo = ({ className = "" }) => {
  return (
    <Link href="/" className={`hover-scale ${className}`}>
      <div className="flex items-center space-x-2">
        {/* Logo Symbol */}
        <div className="relative">
          {/* Outer Circle */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center">
            {/* Inner Circle */}
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
              {/* S Symbol */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary"
              >
                <path
                  d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 2.5C10.7614 2.5 13 4.73858 13 7.5C13 10.2614 10.7614 12.5 8 12.5C5.23858 12.5 3 10.2614 3 7.5C3 4.73858 5.23858 2.5 8 2.5Z"
                  fill="currentColor"
                />
                <path
                  d="M8 4C6.34315 4 5 5.34315 5 7C5 8.65685 6.34315 10 8 10C9.65685 10 11 8.65685 11 7C11 5.34315 9.65685 4 8 4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
        </div>
        
        {/* Logo Text */}
        <div className="flex flex-col">
          <span className="text-xl font-bold gradient-title tracking-tight">Spenzly</span>
          <span className="text-xs text-muted-foreground tracking-wider">FINANCE</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo; 