"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
import type { KisiType, RolOldType, YetkiType } from "@/types";
import { FetcherGet } from "@/utils";

// #region ModalContext
type ModalContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  id: number;
  setId: (id: number) => void;
}

const modalContext = createContext<ModalContextType | undefined>(undefined);

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
    <modalContext.Provider value={value}>
      {children}
    </modalContext.Provider>
  )
}

export function useModalContext() {
  const context = useContext(modalContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context
}
// #endregion

// #region StaticTablesContext
type StaticTablesContextType = {
  kisiler: KisiType[];
  setKisiler: (kisiler: KisiType[]) => void;

  kullaniciAdlari: string[]
  setKullaniciAdlari: (kullaniciAdlari: string[]) => void;

  roller: RolOldType[];
  setRoller: (roller: RolOldType[]) => void;

  yetkiler: YetkiType[];
  setYetkiler: (yetkiler: YetkiType[]) => void;

  sayfalar: string[];
  setSayfalar: (sayfalar: string[]) => void;

  anyBekleyenTalep: boolean;
  setAnyBekleyenTalep: (anyBekleyenTalep: boolean) => void;
}

const staticTablesContext = createContext<StaticTablesContextType | undefined>(undefined);

export function StaticTablesContextWrapper({ children }: {
  children: React.ReactNode;
}) {
  const session = useSession();

  const [kisiler, setKisiler] = useState<KisiType[]>([]);
  const [kullaniciAdlari, setKullaniciAdlari] = useState<string[]>([]);
  const [roller, setRoller] = useState<RolOldType[]>([]);
  const [yetkiler, setYetkiler] = useState<YetkiType[]>([]);
  const [sayfalar, setSayfalar] = useState<string[]>([]);
  const [anyBekleyenTalep, setAnyBekleyenTalep] = useState<boolean>(false);
  useEffect(() => {
    if (!session.data?.token) {
      return;
    }
    const fetchData = async () => {
      try {
        // Use Promise.all to fetch both resources in parallel
        const [rolData, kisiData, kullaniciAdlari, yetkiData, sayfaData, anyBekleyenTalep] = await Promise.all([
          FetcherGet(`/Rol`, session.data?.token),
          FetcherGet(`/Kisi`, session.data?.token),
          FetcherGet(`/Kisi/kullanici-adlari`, session.data?.token),
          // GetKullaniciAdlari(),
          FetcherGet(`/Yetki`, session.data?.token),
          FetcherGet(`/Sayfa`, session.data?.token),
          // bekleyenTalepler()
          FetcherGet(`/Talep/bekleyen-talepler`, session.data?.token)
        ]);

        // Set state with the data
        setRoller(rolData);
        setKisiler(kisiData);
        setKullaniciAdlari(kullaniciAdlari);
        setYetkiler(yetkiData);
        setSayfalar(sayfaData);
        setAnyBekleyenTalep(anyBekleyenTalep);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [session.data?.token]);


  const value: StaticTablesContextType = {
    kisiler, setKisiler,
    kullaniciAdlari, setKullaniciAdlari,
    roller, setRoller,
    yetkiler, setYetkiler,
    sayfalar, setSayfalar,
    anyBekleyenTalep, setAnyBekleyenTalep
  }
  return (
    <staticTablesContext.Provider value={value}>
      {children}
    </staticTablesContext.Provider>
  )
}

export function useStaticTablesContext() {
  const context = useContext(staticTablesContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context
}

// #endregion