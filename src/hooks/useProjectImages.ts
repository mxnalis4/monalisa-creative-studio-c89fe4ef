import { useCallback, useEffect, useState } from "react";

type Store = { cover?: string; gallery: string[] };
const KEY = "monalisa-portfolio-images-v1";

function readAll(): Record<string, Store> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function writeAll(data: Record<string, Store>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Falha ao salvar imagens (armazenamento cheio?)", e);
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Downscale to keep localStorage manageable
async function compress(file: File, maxDim = 1600, quality = 0.85): Promise<string> {
  const dataUrl = await fileToDataUrl(file);
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(dataUrl);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export function useProjectImages(projectId: string) {
  const [store, setStore] = useState<Store>({ gallery: [] });

  useEffect(() => {
    const all = readAll();
    setStore(all[projectId] || { gallery: [] });
  }, [projectId]);

  const persist = useCallback(
    (next: Store) => {
      const all = readAll();
      all[projectId] = next;
      writeAll(all);
      setStore(next);
    },
    [projectId],
  );

  const setCover = useCallback(
    async (file: File) => {
      const url = await compress(file, 2000, 0.88);
      persist({ ...store, cover: url });
    },
    [persist, store],
  );

  const clearCover = useCallback(() => {
    persist({ ...store, cover: undefined });
  }, [persist, store]);

  const addGalleryImages = useCallback(
    async (files: FileList | File[]) => {
      const arr = Array.from(files);
      const compressed = await Promise.all(arr.map((f) => compress(f)));
      persist({ ...store, gallery: [...store.gallery, ...compressed] });
    },
    [persist, store],
  );

  const removeGalleryImage = useCallback(
    (index: number) => {
      const next = store.gallery.filter((_, i) => i !== index);
      persist({ ...store, gallery: next });
    },
    [persist, store],
  );

  return { cover: store.cover, gallery: store.gallery, setCover, clearCover, addGalleryImages, removeGalleryImage };
}
