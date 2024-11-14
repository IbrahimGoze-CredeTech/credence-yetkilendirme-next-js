import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user.role[0];
};

export const useCurrentRoles = () => {
  const session = useSession();

  return session.data?.user.role;
};
