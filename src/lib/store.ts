import { create } from 'zustand';
import { supabase } from './supabase';

export interface Project {
  id: string;
  name: string;
  template: string;
  layout: any;
  published: boolean;
  store_url: string | null;
  created_at: string;
}

interface User {
  id: string;
  email: string;
}

interface AppState {
  user: User | null;
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;

  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;

  // Project actions
  fetchProjects: () => Promise<void>;
  fetchProjectById: (id: string) => Promise<void>;
  createProject: (project: Omit<Project, 'id' | 'created_at' | 'published' | 'layout'>) => Promise<string>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  saveLayout: (id: string, layout: any) => Promise<void>;
  publishProject: (id: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: null,
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  // Auth actions
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: { id: data.user.id, email: data.user.email || '' },
          isLoading: false
        });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signup: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        set({
          user: { id: data.user.id, email: data.user.email || '' },
          isLoading: false
        });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, projects: [], currentProject: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },

  checkSession: async () => {
    console.log("🔍 checkSession called");
    set({ isLoading: true });
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      console.log("📦 Session: ", session);

      if (session?.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email || '',
          },
          isLoading: false
        });
      } else {
        set({
          user: null,
          isLoading: false
        });
      }
    } catch (error: any) {
      console.error("❌ checkSession error:", error.message);
      set({
        error: error.message,
        isLoading: false
      });
    }
  },

  // Project actions
  fetchProjects: async () => {
    const { user } = get();
    if (!user) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      set({ projects: data as Project[], isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchProjectById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/getProjectById?id=${id}`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }

      const data = await response.json();
      set({ currentProject: data as Project, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createProject: async (project) => {
    const { user } = get();
    if (!user) throw new Error('User not authenticated');

    set({ isLoading: true, error: null });
    try {
      const newProject = {
        ...project,
        user_id: user.id,
        published: false,
        layout: null,
      };

      const { data, error } = await supabase
        .from('projects')
        .insert(newProject)
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        projects: [...state.projects, data as Project],
        isLoading: false
      }));

      return data.id;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateProject: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        projects: state.projects.map(p => p.id === id ? { ...p, ...updates } : p),
        currentProject: state.currentProject?.id === id ? { ...state.currentProject, ...updates } : state.currentProject,
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  saveLayout: async (id, layout) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('projects')
        .update({ layout })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        currentProject: state.currentProject ? { ...state.currentProject, layout } : null,
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  publishProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('projects')
        .update({ published: true })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        currentProject: state.currentProject ? { ...state.currentProject, published: true } : null,
        projects: state.projects.map(p => p.id === id ? { ...p, published: true } : p),
        isLoading: false
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
