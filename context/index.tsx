"use client";
import { GetKullaniciAdlari } from "@/actions/kisi-yaratma";
import { bekleyenTalepler } from "@/actions/waiting-demands";
import { Kisi, RolOld, Yetki } from "@/types";
import { fetcherGet } from "@/utils";
// import { set } from "date-fns";
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

  kullaniciAdlari: string[]
  setKullaniciAdlari: (kullaniciAdlari: string[]) => void;

  roller: RolOld[];
  setRoller: (roller: RolOld[]) => void;

  yetkiler: Yetki[];
  setYetkiler: (yetkiler: Yetki[]) => void;

  sayfalar: string[];
  setSayfalar: (sayfalar: string[]) => void;

  anyBekleyenTalep: boolean;
  setAnyBekleyenTalep: (anyBekleyenTalep: boolean) => void;
}

const StaticTablesContext = createContext<StaticTablesContextType | undefined>(undefined);

export function StaticTablesContextWrapper({ children }: {
  children: React.ReactNode;
}) {
  const session = useSession();

  const [kisiler, setKisiler] = useState<Kisi[]>([]);
  const [kullaniciAdlari, setKullaniciAdlari] = useState<string[]>([]);
  const [roller, setRoller] = useState<RolOld[]>([]);
  const [yetkiler, setYetkiler] = useState<Yetki[]>([]);
  const [sayfalar, setSayfalar] = useState<string[]>([]);
  const [anyBekleyenTalep, setAnyBekleyenTalep] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Promise.all to fetch both resources in parallel
        const [rolData, kisiData, kullaniciAdlari, yetkiData, sayfaData, anyBekleyenTalep] = await Promise.all([
          fetcherGet(`/Rol`, session.data?.token),
          fetcherGet(`/Kisi`, session.data?.token),
          GetKullaniciAdlari(),
          fetcherGet(`/Yetki`, session.data?.token),
          fetcherGet(`/Sayfa`, session.data?.token),
          bekleyenTalepler()
        ]);

        // console.log("anyBekleyenTalep: ", anyBekleyenTalep);

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