import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// These environment variables are set by Bolt.new when connecting to Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);