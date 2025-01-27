import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '../../utils/types';
import { orderBurgerApi } from '@api';

interface BurgerConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TConstructorIngredient>) => {
      const newItem = { ...action.payload, id: generateId() };
      if (newItem.type === 'bun') {
        state.constructorItems.bun = newItem;
      } else {
        state.constructorItems.ingredients.push(newItem);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    clearOrder: (state) => initialState,
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const newIngredients = state.constructorItems.ingredients.map((item) => ({
        ...item
      }));
      const [removed] = newIngredients.splice(fromIndex, 1);
      newIngredients.splice(toIndex, 0, removed);
      state.constructorItems.ingredients = newIngredients;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.error = null;
      });
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  }
});

export const { addItem, removeIngredient, clearOrder, moveIngredient } =
  burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
export const { getOrderRequest, getOrderModalData, getLoading, getError } =
  burgerConstructorSlice.selectors;
