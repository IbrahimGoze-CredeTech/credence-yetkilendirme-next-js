'use client'

import { UseCurrentRoles } from "@/hooks/use-current-role";
import FormError from "./form-error";
// import { UserRole } from "@prisma/client";

interface IRoleGateProps {
  children: React.ReactNode;
  allowedRole: string;
  showError?: boolean;
}

export const RoleGate = ({ children, allowedRole, showError = true }: IRoleGateProps) => {
  const roles = UseCurrentRoles();
  const allowed = roles.includes(allowedRole);
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