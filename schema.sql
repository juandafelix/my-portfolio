-- Create projects table
CREATE TABLE public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Data Analytics', 'Backend', 'Web Dev')),
  thumbnail_url TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('pdf', 'image', 'external_link')),
  media_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Policy for Public Read
CREATE POLICY "Public can select projects"
  ON public.projects FOR SELECT
  USING (true);

-- Policies for Authenticated Admin Insert/Update/Delete
CREATE POLICY "Admins can insert projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update projects"
  ON public.projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete projects"
  ON public.projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create profile table
CREATE TABLE public.profile (
  id INTEGER PRIMARY KEY DEFAULT 1,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1)
);

-- Create certificates table
CREATE TABLE public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for new tables
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

-- Policies for profile
CREATE POLICY "Public can select profile" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Admins can update profile" ON public.profile FOR ALL USING (auth.role() = 'authenticated');

-- Policies for certificates
CREATE POLICY "Public can select certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Admins can manage certificates" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
