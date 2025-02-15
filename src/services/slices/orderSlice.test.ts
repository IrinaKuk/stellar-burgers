import orderReducer, {
  fetchOrderByNumber,
  ordersUser,
  resetOrderModalData,
  initialState
} from './orderSlice';
import { TOrder } from '../../utils/types';

describe('проверяем редьюсер orderSlice', () => {
  it('Звгрузка номера ордера', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const nextState = orderReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Успешный запрос номера ордера', () => {
    const mockOrder: TOrder = {
      _id: '1',
      ingredients: [],
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 123
    };

    const mockOrderData = {
      orders: [mockOrder]
    };

    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrderData
    };
    const nextState = orderReducer(initialState, action);

    expect(nextState.orderModalData).toEqual(mockOrder);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('Ошибка загрузки номера ордера', () => {
    const errorMessage = 'Feed error';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = orderReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('Загрузка заказа пользователя', () => {
    const action = { type: ordersUser.pending.type };
    const nextState = orderReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Успешный запрос заказа пользователя', () => {
    const mockOrders = [
      {
        _id: '1',
        ingredients: [],
        status: 'done',
        name: 'Order 1',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        number: 123
      } as TOrder,
      {
        _id: '2',
        ingredients: [],
        status: 'pending',
        name: 'Order 2',
        createdAt: '2024-01-02',
        updatedAt: '2024-01-02',
        number: 456
      } as TOrder
    ];

    const action = { type: ordersUser.fulfilled.type, payload: mockOrders };
    const nextState = orderReducer(initialState, action);

    expect(nextState.orders).toEqual(mockOrders);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('Ошибка заказа пользователя', () => {
    const errorMessage = 'Feed error';
    const action = {
      type: ordersUser.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = orderReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('Перезагрузка данных модального окна', () => {
    const stateWithModalData = {
      ...initialState,
      orderModalData: {
        _id: '1',
        ingredients: [],
        status: 'done',
        name: 'Order 1',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        number: 123
      } as TOrder,
      error: 'Some Error'
    };
    const action = { type: resetOrderModalData.type };
    const nextState = orderReducer(stateWithModalData, action);

    expect(nextState.orderModalData).toBeNull();
    expect(nextState.error).toBeNull();
  });
});
