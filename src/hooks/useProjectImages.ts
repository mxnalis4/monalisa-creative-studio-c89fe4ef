import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ImageRow = {
  id: string;
  storage_path: string;
  kind: "cover" | "gallery";
  sort_order: number;
};

type GalleryItem = { id: string; url: string };

const BUCKET = "project-images";
const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 days

async function sign(path: string): Promise<string | null> {
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, SIGNED_URL_TTL);
  return data?.signedUrl ?? null;
}

async function compress(file: File, maxDim = 1800, quality = 0.86): Promise<Blob> {
  const dataUrl: string = await new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
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
      if (!ctx) return resolve(file);
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", quality);
    };
    img.onerror = () => resolve(file);
    img.src = dataUrl;
  });
}

export function useProjectImages(projectId: string) {
  const [cover, setCoverState] = useState<string | undefined>();
  const [coverPath, setCoverPath] = useState<string | undefined>();
  const [coverId, setCoverId] = useState<string | undefined>();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [galleryPaths, setGalleryPaths] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("project_images")
      .select("id, storage_path, kind, sort_order")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });
    if (error || !data) return;
    const rows = data as ImageRow[];

    const coverRow = rows.find((r) => r.kind === "cover");
    if (coverRow) {
      const url = await sign(coverRow.storage_path);
      setCoverState(url ?? undefined);
      setCoverPath(coverRow.storage_path);
      setCoverId(coverRow.id);
    } else {
      setCoverState(undefined);
      setCoverPath(undefined);
      setCoverId(undefined);
    }

    const gRows = rows.filter((r) => r.kind === "gallery");
    const signed = await Promise.all(
      gRows.map(async (r) => ({ id: r.id, url: (await sign(r.storage_path)) ?? "", path: r.storage_path })),
    );
    setGallery(signed.filter((s) => s.url).map(({ id, url }) => ({ id, url })));
    setGalleryPaths(Object.fromEntries(signed.map((s) => [s.id, s.path])));
  }, [projectId]);

  useEffect(() => {
    load();
  }, [load]);

  const setCover = useCallback(
    async (file: File) => {
      const blob = await compress(file, 2000, 0.88);
      const path = `${projectId}/cover-${Date.now()}.jpg`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, blob, {
        contentType: "image/jpeg",
        upsert: false,
      });
      if (upErr) {
        console.error(upErr);
        return;
      }
      // remove previous cover (row + storage)
      if (coverId && coverPath) {
        await supabase.storage.from(BUCKET).remove([coverPath]);
        await supabase.from("project_images").delete().eq("id", coverId);
      }
      const { error: insErr } = await supabase
        .from("project_images")
        .insert({ project_id: projectId, storage_path: path, url: "", kind: "cover", sort_order: 0 });
      if (insErr) console.error(insErr);
      await load();
    },
    [projectId, coverId, coverPath, load],
  );

  const clearCover = useCallback(async () => {
    if (!coverId || !coverPath) return;
    await supabase.storage.from(BUCKET).remove([coverPath]);
    await supabase.from("project_images").delete().eq("id", coverId);
    setCoverState(undefined);
    setCoverPath(undefined);
    setCoverId(undefined);
  }, [coverId, coverPath]);

  const addGalleryImages = useCallback(
    async (files: FileList | File[]) => {
      const arr = Array.from(files);
      const base = gallery.length;
      for (let i = 0; i < arr.length; i++) {
        const blob = await compress(arr[i]);
        const path = `${projectId}/gallery-${Date.now()}-${i}.jpg`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, blob, {
          contentType: "image/jpeg",
          upsert: false,
        });
        if (upErr) {
          console.error(upErr);
          continue;
        }
        await supabase.from("project_images").insert({
          project_id: projectId,
          storage_path: path,
          url: "",
          kind: "gallery",
          sort_order: base + i,
        });
      }
      await load();
    },
    [projectId, gallery.length, load],
  );

  const removeGalleryImage = useCallback(
    async (index: number) => {
      const item = gallery[index];
      if (!item) return;
      const path = galleryPaths[item.id];
      if (path) await supabase.storage.from(BUCKET).remove([path]);
      await supabase.from("project_images").delete().eq("id", item.id);
      await load();
    },
    [gallery, galleryPaths, load],
  );

  return {
    cover,
    gallery: gallery.map((g) => g.url),
    setCover,
    clearCover,
    addGalleryImages,
    removeGalleryImage,
  };
}
