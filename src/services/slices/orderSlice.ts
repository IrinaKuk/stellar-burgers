import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

interface OrderModalState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
  orderModalData: TOrder | null;
}

export const initialState: OrderModalState = {
  orders: [],
  loading: false,
  error: null,
  orderModalData: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response;
    } catch (error) {
      return rejectWithValue('Error feed data');
    }
  }
);

export const ordersUser = createAsyncThunk('user/orderHistory', getOrdersApi);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModalData: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderModalData = action.payload.orders[0];
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      })
      .addCase(ordersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ordersUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(ordersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Feed error';
      });
  }
});

export const { resetOrderModalData } = orderSlice.actions;
export default orderSlice.reducer;
