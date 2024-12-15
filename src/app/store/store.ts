import { configureStore } from '@reduxjs/toolkit'
import pdfReducer, { PdfState } from './slices/pdfSlice'

const store = configureStore({
  reducer: {
    pdf: pdfReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = {
  pdf: PdfState; // Типизируем состояние
};
export type AppDispatch = typeof store.dispatch;

export default store;
