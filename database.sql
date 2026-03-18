-- Supabase schema for Anonymous Employee Feedback App

CREATE TABLE public.responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  score integer NOT NULL CHECK (score >= 0 AND score <= 10),
  negative_feedback text,
  improvement text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

-- Create Policy to insert responses anonymously
CREATE POLICY "Enable insert for anonymous users" ON public.responses
  FOR INSERT
  WITH CHECK (true);

-- Create Policy to allow read access (for admin dashboard, typically you'd protect this check, but for this exercise we keep it simple or allow anon)
CREATE POLICY "Enable read access for all users" ON public.responses
  FOR SELECT
  USING (true);
