import { useEffect, useState } from "react";
import { getAdminStatus, lockAdmin, unlockAdmin } from "@/lib/admin.functions";

let cached: boolean | null = null;
let pending: Promise<boolean> | null = null;
const listeners = new Set<(v: boolean) => void>();

function broadcast(v: boolean) {
  cached = v;
  listeners.forEach((l) => l(v));
}

async function resolveAdmin(): Promise<boolean> {
  const params = new URLSearchParams(window.location.search);
  const flag = params.get("admin");

  if (flag === "0") {
    await lockAdmin();
    return false;
  }

  const { unlocked } = await getAdminStatus();
  if (unlocked) return true;

  if (flag === "1") {
    const password = window.prompt("Senha de administradora:");
    if (!password) return false;
    const { ok } = await unlockAdmin({ data: { password } });
    if (!ok) window.alert("Senha incorreta.");
    return ok;
  }

  return false;
}

/**
 * Modo administrador: habilita os controles de upload/remoção de imagens.
 * Acesse o site com `?admin=1` e informe a senha. Use `?admin=0` para sair.
 * A liberação fica em um cookie seguro e é validada no servidor a cada envio.
 */
export function useAdminMode() {
  const [isAdmin, setIsAdmin] = useState(cached ?? false);

  useEffect(() => {
    listeners.add(setIsAdmin);
    if (cached !== null) {
      setIsAdmin(cached);
    } else {
      pending =
        pending ??
        resolveAdmin().catch(() => false);
      pending.then(broadcast);
    }
    return () => {
      listeners.delete(setIsAdmin);
    };
  }, []);

  return isAdmin;
}
