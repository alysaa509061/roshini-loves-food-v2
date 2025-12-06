-- Drop existing user-based RLS policies
DROP POLICY IF EXISTS "Users can view their own recipes" ON public.recipes;
DROP POLICY IF EXISTS "Users can create their own recipes" ON public.recipes;
DROP POLICY IF EXISTS "Users can update their own recipes" ON public.recipes;
DROP POLICY IF EXISTS "Users can delete their own recipes" ON public.recipes;

-- Make user_id nullable since we won't use auth
ALTER TABLE public.recipes ALTER COLUMN user_id DROP NOT NULL;

-- Create simple public access policies (protected by AccessGate in app)
CREATE POLICY "Allow all read access"
ON public.recipes FOR SELECT
USING (true);

CREATE POLICY "Allow all insert access"
ON public.recipes FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow all update access"
ON public.recipes FOR UPDATE
USING (true);

CREATE POLICY "Allow all delete access"
ON public.recipes FOR DELETE
USING (true);