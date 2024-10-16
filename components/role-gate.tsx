'use client'

import { useCurrentRole } from "@/hooks/use-current-role";
import FormError from "./form-error";
// import { UserRole } from "@prisma/client";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: string;
  showError?: boolean;
}

export const RoleGate = ({ children, allowedRole, showError = true }: RoleGateProps) => {
  const role = useCurrentRole();
  const allowed = role === allowedRole;
  if (!allowed && showError) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }
  else if (!allowed && !showError) {
    return (
      <></>
    );
  }
  return (
    <>
      {children}
    </>
  )
}