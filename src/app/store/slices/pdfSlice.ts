import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PdfState { // Экспортируем PdfState
  files: Array<{ name: string; file: File; url: string }>;
  task: any; // Тип task можно уточнить, если есть информация о его типе
}

const initialState: PdfState = {
  files: [],
  task: null, // Изначально задача пуста
};

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<{ name: string; file: File; url: string }>) => {
      state.files.push(action.payload);
    },
    setTask: (state, action: PayloadAction<any>) => {
      state.task = action.payload; // Сохраняем задачу
    },
    clearFiles: (state) => {
      state.files = [];
      state.task = null; // Очищаем задачу
    },
  },
});

export const { addFile, setTask, clearFiles } = pdfSlice.actions;
export default pdfSlice.reducer;
