import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PdfState {
  files: Array<{ name: string; file: File; url: string }>;
  task: any;
  url: string | null;
  range: string | null;
}

const initialState: PdfState = {
  files: [],
  task: null,
  url: null, // Изначально ссылка пуста
  range: null,
};

const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    addFile: (state, action: PayloadAction<{ name: string; file: File; url: string }>) => {
      state.files.push(action.payload);
    },
    setTask: (state, action: PayloadAction<any>) => {
      state.task = action.payload;
    },
    clearFiles: (state) => {
      state.files = [];
      state.task = null;
    },
    addUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    addRange: (state, action: PayloadAction<string>) => {
      state.range = action.payload;
    },
  },
});

export const { addFile, setTask, clearFiles, addUrl, addRange } = pdfSlice.actions;
export default pdfSlice.reducer;
