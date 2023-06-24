"use client";

import { useRouter } from 'next/navigation';
import React from 'react'

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const router = useRouter();

    const handleLogout = () => {
        // Handle logout later
    }

  return (
    
    <div>

    </div>
  )
}

export default Header