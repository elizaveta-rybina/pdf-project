import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PdfState {
  files: Array<{ name: string; file: File; url: string }>;
  task: any;
  url: string | null; // Тип url изменен на string | null
}

const initialState: PdfState = {
  files: [],
  task: null,
  url: null, // Изначально ссылка пуста
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
    addUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload; // Добавляем ссылку в состояние
    },
  },
});

export const { addFile, setTask, clearFiles, addUrl } = pdfSlice.actions;
export default pdfSlice.reducer;
