
CREATE TABLE public.project_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('cover','gallery')),
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX project_images_one_cover_per_project
  ON public.project_images (project_id) WHERE kind = 'cover';

CREATE INDEX project_images_project_kind_idx
  ON public.project_images (project_id, kind, sort_order);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_images TO authenticated;
GRANT ALL ON public.project_images TO service_role;

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view project images"
  ON public.project_images FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert project images"
  ON public.project_images FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update project images"
  ON public.project_images FOR UPDATE
  USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete project images"
  ON public.project_images FOR DELETE
  USING (true);

-- Storage policies for the public bucket
CREATE POLICY "Public read project-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can upload project-images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images');

CREATE POLICY "Anyone can update project-images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-images');

CREATE POLICY "Anyone can delete project-images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images');
