"use client";
import { Kisi, Rol, Yetki } from "@/types";
import { fetcherGet } from "@/utils";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

//#region ModalContext
type ModalContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  id: number;
  setId: (id: number) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalContextWrapper({ children }: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  }

  const value: ModalContextType = {
    isOpen, setIsOpen,
    toggle,
    id, setId,
  }
  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context
}
//#endregion

//#region StaticTablesContext
type StaticTablesContextType = {
  kisiler: Kisi[];
  setKisiler: (kisiler: Kisi[]) => void;

  roller: Rol[];
  setRoller: (roller: Rol[]) => void;

  yetkiler: Yetki[];
  setYetkiler: (yetkiler: Yetki[]) => void;
}

const StaticTablesContext = createContext<StaticTablesContextType | undefined>(undefined);

export function StaticTablesContextWrapper({ children }: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const [kisiler, setKisiler] = useState<Kisi[]>([]);
  const [roller, setRoller] = useState<Rol[]>([]);
  const [yetkiler, setYetkiler] = useState<Yetki[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Promise.all to fetch both resources in parallel
        const [rolData, kisiData, yetkiData] = await Promise.all([
          fetcherGet(`/Rol`, session.data?.token),
          fetcherGet(`/Kisi`, session.data?.token),
          fetcherGet(`/yetki`, session.data?.token)
        ]);

        // Set state with the data
        setRoller(rolData);
        setKisiler(kisiData);
        setYetkiler(yetkiData)
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [session.data?.token]);


  const value: StaticTablesContextType = {
    kisiler, setKisiler,
    roller, setRoller,
    yetkiler, setYetkiler,
  }
  return (
    <StaticTablesContext.Provider value={value}>
      {children}
    </StaticTablesContext.Provider>
  )
}

export function useStaticTablesContext() {
  const context = useContext(StaticTablesContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context
}

//#endregion