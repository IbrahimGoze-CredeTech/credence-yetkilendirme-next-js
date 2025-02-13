'use client'

import { usePathname } from 'next/navigation';
import React from 'react'
import { AppSidebar } from './app-sidebar'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

export default function SidebarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const authRoutes = ["/auth/login", "/auth/register"];

  if (authRoutes.includes(pathname)) return (
    <div>
      {children}
    </div>
  ); // Hide sidebar for auth pages

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger className='ml-1' />
      {children}
    </SidebarProvider>
  )
}
