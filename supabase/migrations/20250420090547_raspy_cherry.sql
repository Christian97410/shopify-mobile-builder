/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `name` (text, not null)
      - `user_id` (uuid, not null, references auth.users)
      - `template` (text, not null)
      - `layout` (jsonb, nullable)
      - `published` (boolean, default false)
      - `store_url` (text, nullable)
  2. Security
    - Enable RLS on `projects` table
    - Add policies for authenticated users to:
      - Select their own projects
      - Insert their own projects
      - Update their own projects
      - Delete their own projects
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  template text NOT NULL,
  layout jsonb,
  published boolean DEFAULT false,
  store_url text
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy for users to select their own projects
CREATE POLICY "Users can view their own projects"
  ON projects
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to insert their own projects
CREATE POLICY "Users can insert their own projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own projects
CREATE POLICY "Users can update their own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy for users to delete their own projects
CREATE POLICY "Users can delete their own projects"
  ON projects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);