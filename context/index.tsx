"use client";
import { Kisi, Rol } from "@/types";
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
}

const StaticTablesContext = createContext<StaticTablesContextType | undefined>(undefined);

export function StaticTablesContextWrapper({ children }: {
  children: React.ReactNode;
}) {
  const [kisiler, setKisiler] = useState<Kisi[]>([]);
  const [roller, setRoller] = useState<Rol[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Promise.all to fetch both resources in parallel
        const [rolResponse, kisiResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/Rol`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/Kisi`)
        ]);

        // Check for response errors
        if (!rolResponse.ok || !kisiResponse.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the JSON responses
        const [rolData, kisiData] = await Promise.all([
          rolResponse.json(),
          kisiResponse.json()
        ]);

        // Set state with the data
        setRoller(rolData);
        setKisiler(kisiData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);


  const value: StaticTablesContextType = {
    kisiler, setKisiler,
    roller, setRoller,
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