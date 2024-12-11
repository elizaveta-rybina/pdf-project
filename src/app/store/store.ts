import { configureStore } from '@reduxjs/toolkit';
import PdfReducer from './slices/pdfSlice';

const store = configureStore({
  reducer: {
    pdf: PdfReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
