import { ControllerRenderProps } from 'react-hook-form';
import { create } from 'zustand';

import { UploadedFile } from '~types/product.type';

import { CreateProductFormType } from './useCreateProductForm';

export type CreateProductState = {
  formData: Partial<CreateProductFormType>;
  formStatus: 'idle' | 'submitting' | 'submitted';
  isLoading: boolean;
  images: UploadedFile[];
  labDocument: File | null;
};

export type CreateProductActions = {
  resetForm: () => void;
  setFormStatus: (status: 'idle' | 'submitting' | 'submitted') => void;
  setFormData: (data: Partial<CreateProductFormType>) => void;
  setLabDocument: (file: File) => void;
  onUploadLabDocument: (file: File, field: ControllerRenderProps<CreateProductFormType, 'labDocument'>) => void;
  onUploadImage: (files: UploadedFile[], field: ControllerRenderProps<CreateProductFormType, 'images'>) => void;
  handleRemoveImages: (images: string) => void;
  setImages: (images: UploadedFile[]) => void;
};

export type CreateProductSlice = CreateProductState & CreateProductActions;

const initialState: CreateProductState = {
  formData: {
    categories: [],
    images: [],
    labDocument: undefined,
    description: '',
    name: '',
  },
  formStatus: 'idle',
  isLoading: false,
  images: [],
  labDocument: null,
};

export const useCreateProductStore = create<CreateProductSlice>((set) => ({
  ...initialState,
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setFormStatus: (status) => set({ formStatus: status }),
  resetForm: () => set({ formData: {}, formStatus: 'idle' }),
  setLabDocument: (file) => set({ labDocument: file }),
  onUploadImage: (files, field) => {
    set((state) => ({
      ...state,
      images: files,
    }));
    field.onChange(files); // Update the form field value
  },
  handleRemoveImages: (image) => {
    set((state) => ({
      ...state,
      images: state.images.filter((img) => img.preview !== image),
    }));
  },
  onUploadLabDocument: (file, field) => {
    set((state) => ({
      ...state,
      labDocument: file,
    }));

    field.onChange(file); // Update the form field value
  },
  setImages: (images) => set({ images }),
}));
