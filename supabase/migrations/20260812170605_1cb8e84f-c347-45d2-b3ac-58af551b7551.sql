
DROP POLICY IF EXISTS "Anyone can insert project images" ON public.project_images;
DROP POLICY IF EXISTS "Anyone can update project images" ON public.project_images;
DROP POLICY IF EXISTS "Anyone can delete project images" ON public.project_images;

REVOKE INSERT, UPDATE, DELETE ON public.project_images FROM anon, authenticated;
GRANT SELECT ON public.project_images TO anon, authenticated;
GRANT ALL ON public.project_images TO service_role;

DROP POLICY IF EXISTS "Anyone can upload project-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update project-images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project-images" ON storage.objects;
