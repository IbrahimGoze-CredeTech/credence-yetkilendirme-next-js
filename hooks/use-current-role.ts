import { useSession } from "next-auth/react";

export const UseCurrentRole = () => {
  const session = useSession();

  return session.data?.user.role[0];
};

export function UseCurrentRoles(): string[] {
  const session = useSession();

  return session.data?.user.role;
}
