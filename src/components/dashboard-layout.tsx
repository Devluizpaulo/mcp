'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  AlertTriangle,
  MessageSquare,
  Wrench,
  Cpu,
  Bookmark,
  Home,
} from 'lucide-react';
import { UserNav } from './user-nav';

const menuItems = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/upgrade', label: 'Upgrade Meu PC', icon: Wrench },
  { href: '/build', label: 'Montar Novo PC', icon: Cpu },
  { href: '/my-builds', label: 'Minhas Builds', icon: Bookmark },
  { href: '/chat', label: 'Chat com IA', icon: MessageSquare },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold font-headline">MCP</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    icon={<item.icon />}
                    tooltip={item.label}
                  >
                    {item.label}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/90 px-4 backdrop-blur-sm md:static">
          <div className="flex items-center gap-2 md:hidden">
            <AlertTriangle className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold font-headline">MCP</h1>
          </div>
           <div className="hidden md:block">
            {/* Espaço reservado no desktop, pode ser usado para breadcrumbs ou título da página */}
           </div>
          <div className="flex items-center gap-2">
            <UserNav />
            <SidebarTrigger className="md:hidden" />
          </div>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
