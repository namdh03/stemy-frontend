import { create } from 'zustand';

import { CreateCategoryFormType, UpdateCategoryFormType } from './useCategoryListForm';

export type CategoryListState = {
  createCategoryFormData: Partial<CreateCategoryFormType>;
  updateCategoryFormData: Partial<UpdateCategoryFormType>;
  createCategoryFormStatus: 'idle' | 'submitting' | 'submitted';
  updateCategoryFormStatus: 'idle' | 'submitting' | 'submitted';
  isLoading: boolean;
};

export type CategoryListActions = {
  resetCreateCategoryForm: () => void;
  resetUpdateCategoryForm: () => void;
  setCreateCategoryFormStatus: (status: 'idle' | 'submitting' | 'submitted') => void;
  setUpdateCategoryFormStatus: (status: 'idle' | 'submitting' | 'submitted') => void;
  setCreateCategoryFormData: (data: Partial<CreateCategoryFormType>) => void;
  setUpdateCategoryFormData: (data: Partial<UpdateCategoryFormType>) => void;
};

export type CategoryListSlice = CategoryListState & CategoryListActions;

const initialState: CategoryListState = {
  createCategoryFormData: {
    name: '',
    title: '',
    type: '',
  },
  updateCategoryFormData: {
    name: '',
    title: '',
    type: '',
  },
  createCategoryFormStatus: 'idle',
  updateCategoryFormStatus: 'idle',
  isLoading: false,
};

export const useCategoryListStore = create<CategoryListSlice>((set) => ({
  ...initialState,
  setCreateCategoryFormData: (data) => set((state) => ({ createCategoryFormData: { ...state.createCategoryFormData, ...data } })),
  setUpdateCategoryFormData: (data) => set((state) => ({ updateCategoryFormData: { ...state.updateCategoryFormData, ...data } })),
  setCreateCategoryFormStatus: (status) => set({ createCategoryFormStatus: status }),
  setUpdateCategoryFormStatus: (status) => set({ updateCategoryFormStatus: status }),
  resetCreateCategoryForm: () => set({ createCategoryFormData: {}, createCategoryFormStatus: 'idle' }),
  resetUpdateCategoryForm: () => set({ updateCategoryFormData: {}, updateCategoryFormStatus: 'idle' }),
}));
