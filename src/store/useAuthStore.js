import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [],
      error: null,

      signup: (email, password, name) => {
        const state = get();
        const existingUser = state.users.find(u => u.email === email);

        if (existingUser) {
          return { success: false, message: 'Email already registered' };
        }

        if (password.length < 6) {
          return { success: false, message: 'Password must be at least 6 characters' };
        }

        const newUser = {
          id: Date.now().toString(),
          email,
          password,
          name,
          createdAt: new Date().toISOString(),
        };

        set(state => ({
          users: [...state.users, newUser],
          user: { id: newUser.id, email, name },
          isAuthenticated: true,
          error: null,
        }));

        return { success: true };
      },

      login: (email, password) => {
        const state = get();
        const foundUser = state.users.find(u => u.email === email && u.password === password);

        if (!foundUser) {
          return { success: false, message: 'Invalid email or password' };
        }

        set({
          user: { id: foundUser.id, email: foundUser.email, name: foundUser.name },
          isAuthenticated: true,
          error: null,
        });

        return { success: true };
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'brokebutsmart-auth',
    }
  )
);

export default useAuthStore;