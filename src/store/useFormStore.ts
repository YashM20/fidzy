import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FeedbackData } from '@/components/feedback/types';

export interface FormState {
  // Content type
  contentType: 'feedback' | 'receipt' | 'invoice' | 'invitation' | 'survey' | 'certificate' | 'card' | 'brochure';
  
  // Design settings
  design: 'modern' | 'playful' | 'cafe';
  
  // User information
  userName: string;
  points: number;
  walletBalance: number;
  
  // Form fields
  formFields: {
    id: string;
    type: 'rating' | 'text' | 'checkbox' | 'date' | 'select';
    label: string;
    required: boolean;
    options?: string[];
    placeholder?: string;
  }[];
  
  // Actions
  setContentType: (type: FormState['contentType']) => void;
  setDesign: (design: FormState['design']) => void;
  setUserName: (name: string) => void;
  setPoints: (points: number) => void;
  setWalletBalance: (balance: number) => void;
  
  addField: (field: Omit<FormState['formFields'][0], 'id'>) => void;
  updateField: (id: string, field: Partial<Omit<FormState['formFields'][0], 'id'>>) => void;
  removeField: (id: string) => void;
  duplicateField: (id: string) => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set, get) => ({
      // Default values
      contentType: 'feedback',
      design: 'cafe',
      userName: 'Anita',
      points: 50,
      walletBalance: 250,
      formFields: [
        {
          id: '1',
          type: 'rating',
          label: 'How was your experience?',
          required: true,
        },
        {
          id: '2',
          type: 'text',
          label: 'Any additional comments?',
          required: false,
          placeholder: 'Tell us what you think...',
        },
      ],
      
      // Actions
      setContentType: (contentType) => set({ contentType }),
      setDesign: (design) => set({ design }),
      setUserName: (userName) => set({ userName }),
      setPoints: (points) => set({ points }),
      setWalletBalance: (walletBalance) => set({ walletBalance }),
      
      addField: (field) => set((state) => ({
        formFields: [...state.formFields, { ...field, id: crypto.randomUUID() }]
      })),
      
      updateField: (id, field) => set((state) => ({
        formFields: state.formFields.map((f) => 
          f.id === id ? { ...f, ...field } : f
        )
      })),
      
      removeField: (id) => set((state) => ({
        formFields: state.formFields.filter((f) => f.id !== id)
      })),
      
      duplicateField: (id) => set((state) => {
        const fieldToDuplicate = state.formFields.find(f => f.id === id);
        if (!fieldToDuplicate) return state;
        
        const duplicatedField = {
          ...fieldToDuplicate,
          id: crypto.randomUUID(),
          label: `${fieldToDuplicate.label} (Copy)`
        };
        
        return {
          formFields: [...state.formFields, duplicatedField]
        };
      }),
    }),
    {
      name: 'Fidzy-storage',
    }
  )
); 