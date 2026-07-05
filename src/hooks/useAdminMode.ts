import { useEffect, useState } from "react";

const KEY = "monalisa-admin-mode";

/**
 * Modo administrador: habilita os controles de upload/remoção de imagens.
 * Ative acessando o site com `?admin=1` na URL. Desative com `?admin=0`.
 * A preferência fica salva no navegador.
 */
export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const flag = params.get("admin");
    if (flag === "1") localStorage.setItem(KEY, "1");
    else if (flag === "0") localStorage.removeItem(KEY);
    setIsAdmin(localStorage.getItem(KEY) === "1");
  }, []);

  return isAdmin;
}
