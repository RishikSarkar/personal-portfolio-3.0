import React from 'react';
import Link from 'next/link';

interface InteractiveLinkProps {
  href: string;
  children: React.ReactNode;
}

const InteractiveLink: React.FC<InteractiveLinkProps> = ({ href, children }) => {
  return (
    <Link href={href}>
      <span className="opacity-0 transition-all duration-300 hover:opacity-100 hover:scale-105 hover:text-white cursor-pointer">
        {children}
      </span>
    </Link>
  );
};

export default InteractiveLink;