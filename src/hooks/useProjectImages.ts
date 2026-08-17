import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { createUploadUrl, deleteImage, recordImage } from "@/lib/admin.functions";


type ImageRow = {
  id: string;
  storage_path: string;
  kind: "cover" | "gallery";
  sort_order: number;
};

type GalleryItem = { id: string; url: string };

const BUCKET = "project-images";
const SIGNED_URL_TTL = 60 * 60 * 24 * 7; // 7 days

const urlCache = new Map<string, { url: string; exp: number }>();

async function signMany(paths: string[]): Promise<Record<string, string>> {
  const now = Date.now();
  const out: Record<string, string> = {};
  const missing: string[] = [];
  for (const p of paths) {
    const hit = urlCache.get(p);
    if (hit && hit.exp > now) out[p] = hit.url;
    else missing.push(p);
  }
  if (missing.length) {
    const { data } = await supabase.storage.from(BUCKET).createSignedUrls(missing, SIGNED_URL_TTL);
    for (const d of data ?? []) {
      if (d.signedUrl && d.path) {
        out[d.path] = d.signedUrl;
        urlCache.set(d.path, { url: d.signedUrl, exp: now + (SIGNED_URL_TTL - 3600) * 1000 });
      }
    }
  }
  return out;
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

    const urls = await signMany(rows.map((r) => r.storage_path));

    const coverRow = rows.find((r) => r.kind === "cover");
    if (coverRow) {
      setCoverState(urls[coverRow.storage_path]);
      setCoverPath(coverRow.storage_path);
      setCoverId(coverRow.id);
    } else {
      setCoverState(undefined);
      setCoverPath(undefined);
      setCoverId(undefined);
    }

    const gRows = rows.filter((r) => r.kind === "gallery");
    const signed = gRows.map((r) => ({ id: r.id, url: urls[r.storage_path] ?? "", path: r.storage_path }));
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
      try {
        const signed = await createUploadUrl({ data: { path } });
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .uploadToSignedUrl(signed.path, signed.token, blob, { contentType: "image/jpeg" });
        if (upErr) throw upErr;
        if (coverId && coverPath) {
          await deleteImage({ data: { id: coverId, path: coverPath } });
        }
        await recordImage({ data: { projectId, path, kind: "cover", sortOrder: 0 } });
      } catch (err) {
        console.error(err);
        return;
      }
      await load();
    },
    [projectId, coverId, coverPath, load],
  );

  const clearCover = useCallback(async () => {
    if (!coverId || !coverPath) return;
    try {
      await deleteImage({ data: { id: coverId, path: coverPath } });
    } catch (err) {
      console.error(err);
      return;
    }
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
        try {
          const signed = await createUploadUrl({ data: { path } });
          const { error: upErr } = await supabase.storage
            .from(BUCKET)
            .uploadToSignedUrl(signed.path, signed.token, blob, { contentType: "image/jpeg" });
          if (upErr) throw upErr;
          await recordImage({ data: { projectId, path, kind: "gallery", sortOrder: base + i } });
        } catch (err) {
          console.error(err);
          continue;
        }
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
      try {
        await deleteImage({ data: { id: item.id, path: path ?? "" } });
      } catch (err) {
        console.error(err);
        return;
      }
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
