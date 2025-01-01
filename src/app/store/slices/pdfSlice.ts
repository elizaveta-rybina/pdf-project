import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface PdfState {
  files: Array<{ name: string; file: File; url: string }>;
  task: any;
  url: string | null;
  text: string | null;
}

const initialState: PdfState = {
  files: [],
  task: null,
  url: null,
  text: null,
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
    addText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { addFile, setTask, clearFiles, addUrl, addText } = pdfSlice.actions;
export default pdfSlice.reducer;
