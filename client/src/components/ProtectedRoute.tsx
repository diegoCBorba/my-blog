'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAdmin, isLogged } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push('/auth/login');
    } else if (requireAdmin && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, isLogged, requireAdmin, router]);

  if (!isLogged || (requireAdmin && !isAdmin)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
