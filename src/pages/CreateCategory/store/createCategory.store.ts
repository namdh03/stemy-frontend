import { create } from 'zustand';

import { CreateCategoryFormType } from './useCreateCategoryForm';

export type CreateCategoryState = {
  formData: Partial<CreateCategoryFormType>;
  formStatus: 'idle' | 'submitting' | 'submitted';
  isLoading: boolean;
};

export type CreateCategoryActions = {
  resetForm: () => void;
  setFormStatus: (status: 'idle' | 'submitting' | 'submitted') => void;
  setFormData: (data: Partial<CreateCategoryFormType>) => void;
};

export type CreateCategorySlice = CreateCategoryState & CreateCategoryActions;

const initialState: CreateCategoryState = {
  formData: {
    name: '',
    title: '',
    type: '',
  },
  formStatus: 'idle',
  isLoading: false,
};

export const useCreateCategoryStore = create<CreateCategorySlice>((set) => ({
  ...initialState,
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setFormStatus: (status) => set({ formStatus: status }),
  resetForm: () => set({ formData: {}, formStatus: 'idle' }),
}));
