/*
  # Create projects table and security policies
  
  1. New Tables
    - `projects`
      - `id` (uuid, primary key, default: generated random UUID)
      - `created_at` (timestamp with time zone, default: current timestamp)
      - `name` (text, not null)
      - `user_id` (uuid, not null, foreign key to users.id)
      - `template` (text, not null)
      - `layout` (jsonb, nullable)
      - `published` (boolean, default: false)
      - `store_url` (text, nullable)
  
  2. Security
    - Enable RLS on `projects` table
    - Add policies for authenticated users to:
      - Select their own projects
      - Insert their own projects
      - Update their own projects
      - Delete their own projects
*/

-- Create projects table if it doesn't exist
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  user_id uuid NOT NULL REFERENCES users(id),
  template text NOT NULL,
  layout jsonb,
  published boolean DEFAULT false,
  store_url text
);

-- Enable Row Level Security if not already enabled
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Use DO blocks to conditionally create policies if they don't exist
DO $$
BEGIN
  -- Check if the SELECT policy exists before creating it
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'projects' 
    AND policyname = 'Users can view their own projects'
  ) THEN
    CREATE POLICY "Users can view their own projects"
      ON projects
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
  
  -- Check if the INSERT policy exists before creating it
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'projects' 
    AND policyname = 'Users can insert their own projects'
  ) THEN
    CREATE POLICY "Users can insert their own projects"
      ON projects
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
  
  -- Check if the UPDATE policy exists before creating it
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'projects' 
    AND policyname = 'Users can update their own projects'
  ) THEN
    CREATE POLICY "Users can update their own projects"
      ON projects
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
  
  -- Check if the DELETE policy exists before creating it
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'projects' 
    AND policyname = 'Users can delete their own projects'
  ) THEN
    CREATE POLICY "Users can delete their own projects"
      ON projects
      FOR DELETE
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;
END $$;