-- Add category column to recipes table
ALTER TABLE public.recipes ADD COLUMN category text DEFAULT 'dinner';

-- Create index for category filtering
CREATE INDEX idx_recipes_category ON public.recipes(category);