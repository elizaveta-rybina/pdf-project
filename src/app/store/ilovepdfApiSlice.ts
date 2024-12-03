import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ILovePDFApi from 'app/api/ILovePDFApi';
import { GetSignatureStatus } from '@ilovepdf/ilovepdf-js-core/ILovePDFCoreApi';

const ilovepdfApi = new ILovePDFApi(process.env.PUBLIC_KEY!);

interface ILovePDFState {
  signatures: Array<GetSignatureStatus>;
  loading: boolean;
  error: string | null;
}

const initialState: ILovePDFState = {
  signatures: [],
  loading: false,
  error: null,
};

export const fetchSignatures = createAsyncThunk(
  'ilovepdf/fetchSignatures',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await ilovepdfApi.getSignatureList(page, 20);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const voidSignature = createAsyncThunk(
  'ilovepdf/voidSignature',
  async (signatureToken: string, { rejectWithValue }) => {
    try {
      await ilovepdfApi.voidSignature(signatureToken);
      return signatureToken;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ilovepdfApiSlice = createSlice({
  name: 'ilovepdf',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignatures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSignatures.fulfilled, (state, action: PayloadAction<Array<GetSignatureStatus>>) => {
        state.signatures = action.payload;
        state.loading = false;
      })
      .addCase(fetchSignatures.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(voidSignature.fulfilled, (state, action: PayloadAction<string>) => {
        state.signatures = state.signatures.filter(
          (signature) => signature.token_requester !== action.payload
        );
      })
      .addCase(voidSignature.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export const { resetError } = ilovepdfApiSlice.actions;

export default ilovepdfApiSlice.reducer;
