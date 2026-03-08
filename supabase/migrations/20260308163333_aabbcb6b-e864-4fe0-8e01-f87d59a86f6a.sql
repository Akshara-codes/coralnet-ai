-- Create storage bucket for otolith images
INSERT INTO storage.buckets (id, name, public)
VALUES ('otolith-images', 'otolith-images', true);

-- Allow authenticated users to upload to the bucket
CREATE POLICY "Authenticated users can upload otolith images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'otolith-images');

-- Allow public read access
CREATE POLICY "Public read access for otolith images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'otolith-images');

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own otolith images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'otolith-images' AND (storage.foldername(name))[1] = auth.uid()::text);