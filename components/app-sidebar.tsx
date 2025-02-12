"use client";

import { Home, Inbox, Search, Settings, User2, ChevronUp, ChevronDown, Users, FileText, Eye } from "lucide-react"
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import { useState, useEffect } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

// Menu items.
const items = [
  {
    title: "Anasayfa",
    url: "/",
    icon: Home,
  },
  {
    title: "Kişi Bilgileri",
    url: "/kisi-bilgileri",
    icon: Inbox,
  },
  {
    title: "Organizasyon",
    icon: Users,
    submenu: [
      {
        title: "Roller",
        url: "/rol",
      },
      {
        title: "Yetkiler",
        url: "/yetki",
      },
      {
        title: "Kişiler",
        url: "/kisi",
      },
    ],
  },
  {
    title: "Rol Ve Yetki Atama",
    url: "/rol-yetki",
    icon: Search,
  },
  {
    title: "Talepler",
    icon: FileText,
    submenu: [
      {
        title: "Talepler",
        url: "/talep-ekran",
      },
      {
        title: "Talep Yarat",
        url: "/talep-yarat",
      },
      {
        title: "Talep Kayıtları",
        url: "/talep-kayitlari",
      },
    ],
  },
  {
    title: "Raporlar",
    url: "/rapor",
    icon: Settings,
  },
  {
    title: "Ekle-Sil",
    url: "/kisi-rol-yetki",
    icon: Settings,
  },
  {
    title: "Erişimler",
    icon: Eye,
    submenu: [
      {
        title: "Erişimler",
        url: "/views",
      },
    ],
  },
]

export function AppSidebar() {
  const { state } = useSidebar();
  const user = useCurrentUser();
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  // Close all submenus when sidebar is collapsed
  useEffect(() => {
    if (state === "collapsed") {
      setOpenSubMenus({});
    }
  }, [state]);

  const onLogout = async () => {
    await logout();
    window.location.replace("/auth/login");
  };

  const toggleSubMenu = (title: string) => {
    if (state === "collapsed") return; // Prevent opening submenus when sidebar is collapsed
    setOpenSubMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-azure-radiance-600 ">
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-2xl text-white mb-4">
            Yetkilendirme
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Collapsible open={openSubMenus[item.title]} onOpenChange={() => toggleSubMenu(item.title)} >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="hover:bg-azure-radiance-700 rounded-md transition-colors duration-200 w-full">
                          <item.icon className="text-white text-base font-semibold" />
                          <span className="text-base font-semibold text-white">
                            {item.title}
                          </span>
                          {openSubMenus[item.title] ? (
                            <ChevronUp className="ml-auto text-white" />
                          ) : (
                            <ChevronDown className="ml-auto text-white" />
                          )}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {item.submenu.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <a href={subItem.url} className="hover:bg-azure-radiance-700 rounded-md transition-colors duration-200">
                                <span className="text-base font-semibold text-white ml-6">
                                  {subItem.title}
                                </span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="hover:bg-azure-radiance-700 rounded-md transition-colors duration-200">
                        <item.icon className="text-white text-base font-semibold" />
                        <span className="text-base font-semibold text-white">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-azure-radiance-600">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-azure-radiance-700 rounded-md transition-colors duration-200">
                  <User2 className="text-white" />
                  <span className="text-white font-semibold">
                    {user?.name} ({user?.role[0]})
                  </span>
                  <ChevronUp className="ml-auto text-white" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-white"
              >
                <DropdownMenuItem asChild>
                  <a href="/profil" className="flex items-center hover:bg-azure-radiance-600 hover:text-white transition-colors duration-200 p-2">
                    <span>Profil</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={onLogout} className="hover:bg-azure-radiance-600 hover:text-white transition-colors duration-200 p-2">
                  <span>Çıkış Yap</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
