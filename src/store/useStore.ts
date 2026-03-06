import { create } from 'zustand';

interface AppState {
  isAuthorized: boolean;
  setAuthorized: (status: boolean) => void;
  mousePosition: { x: number; y: number };
  setMousePosition: (x: number, y: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isAuthorized: false,
  setAuthorized: (status) => set({ isAuthorized: status }),
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
}));
