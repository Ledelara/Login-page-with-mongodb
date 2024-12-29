"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

const widthAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!isAuthenticated && pathname !== "/login") {
        router.push("/login");
      }
    }, [isAuthenticated, pathname, router]);

    if (!isAuthenticated && pathname !== "/login") {
      return null; // Exibe um carregamento ou tela em branco enquanto redireciona
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default widthAuth;
