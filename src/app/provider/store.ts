import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from 'shared/lib/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
});

// Типы для использования с TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
