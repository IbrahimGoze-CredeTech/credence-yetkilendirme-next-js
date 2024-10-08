"use client";
import { createContext, useContext, useState } from "react";

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
  id: number;
  setId: (id: number) => void;
  // companies?: Company[];
  // setCompanies?: (companies: Company[]) => void;
  // position: { x: number, y: number };
  // setPosition: (position: { x: number, y: number }) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalContextWrapper({ children }: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  // const [companies, setCompanies] = useState<Company[]>([]);
  // const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

  const toggle = () => {
    // console.log('toggle');
    setIsOpen((prev) => !prev);
  }

  // const openChat = () => setIsOpen(true);
  // const closeChat = () => setIsOpen(false);
  const value: ModalContextType = {
    isOpen, setIsOpen,
    toggle,
    id, setId,
    // companies,
    // setCompanies
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