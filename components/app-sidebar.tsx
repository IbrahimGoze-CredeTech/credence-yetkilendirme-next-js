"use client";

import { ChevronDown, ChevronUp, Eye, FileText, Home, Inbox, Search, Settings, User2, Users } from "lucide-react"
import { useEffect, useState } from "react";
import { logout } from "@/actions/logout";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"


import { UseCurrentUser } from "@/hooks/use-current-user";

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
    title: "Talepler İşlemleri",
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
  const user = UseCurrentUser();
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
    <Sidebar className="overflow-x-hidden bg-azure-radiance-600" collapsible="icon">
      <SidebarHeader>
        Yetkilendirme
      </SidebarHeader>
      <SidebarContent className=" ">
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-2xl text-white mb-4">
            Yetkilendirme
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.submenu ? (
                    <Collapsible
                      onOpenChange={() => toggleSubMenu(item.title)}
                      open={state === "collapsed" ? false : openSubMenus[item.title]}
                    >
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
                              <a className="hover:bg-azure-radiance-700 rounded-md transition-colors duration-200" href={subItem.url}>
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
                      <a className="hover:bg-azure-radiance-700 rounded-md transition-colors duration-200" href={item.url}>
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
                className="w-[--radix-popper-anchor-width] bg-white"
                side="top"
              >
                <DropdownMenuItem asChild>
                  <a className="flex items-center hover:bg-azure-radiance-600 hover:text-white transition-colors duration-200 p-2" href="/profil">
                    <span>Profil</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-azure-radiance-600 hover:text-white transition-colors duration-200 p-2" onSelect={onLogout}>
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
