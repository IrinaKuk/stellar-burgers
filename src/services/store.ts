import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import orderReducer from './slices/orderSlice';
import constructorReducer from './slices/burgerConstructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import feedReducer from './slices/feedSlice';
import useReducer from './slices/userSlice';

export const rootReducer = combineReducers({
  order: orderReducer,
  burgerConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  feed: feedReducer,
  user: useReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
