export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          name: string
          user_id: string
          template: string
          layout: Json | null
          published: boolean
          store_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          user_id: string
          template: string
          layout?: Json | null
          published?: boolean
          store_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          user_id?: string
          template?: string
          layout?: Json | null
          published?: boolean
          store_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}