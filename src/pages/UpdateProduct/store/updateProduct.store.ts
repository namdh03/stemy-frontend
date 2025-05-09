import { ControllerRenderProps } from 'react-hook-form';
import { create } from 'zustand';

import { UploadedFile } from '~types/product.type';

import { UpdateProductFormType } from './useUpdateProductForm';

export type UpdateProductState = {
  formData: Partial<UpdateProductFormType>;
  formStatus: 'idle' | 'submitting' | 'submitted';
  isLoading: boolean;
  images: UploadedFile[];
  labDocument: File | null;
  labChanged: boolean;
};

export type UpdateProductActions = {
  resetForm: () => void;
  setFormStatus: (status: 'idle' | 'submitting' | 'submitted') => void;
  setFormData: (data: Partial<UpdateProductFormType>) => void;
  setLabDocument: (file: File | null) => void;
  onUploadLabDocument: (file: File, field: ControllerRenderProps<UpdateProductFormType, 'labDocument'>) => void;
  onUploadImage: (files: UploadedFile[], field: ControllerRenderProps<UpdateProductFormType, 'images'>) => void;
  handleRemoveImages: (images: string) => void;
  setImages: (images: UploadedFile[]) => void;
  setLabChanged: (changed: boolean) => void;
};

export type UpdateProductSlice = UpdateProductState & UpdateProductActions;

const initialState: UpdateProductState = {
  formData: {
    categories: [],
    images: [],
    labDocument: null,
    description: '',
    name: '',
    price: 0,
  },
  formStatus: 'idle',
  isLoading: false,
  images: [],
  labDocument: null,
  labChanged: false,
};

export const useUpdateProductStore = create<UpdateProductSlice>((set) => ({
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
  setLabChanged: (changed) => set({ labChanged: changed }),
}));
