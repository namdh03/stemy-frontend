import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createAuthSlice } from './auth/auth-slice';
import { Store } from './store.type';

export const useAuthStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createAuthSlice(...a),
      })),
    ),
  ),
);
