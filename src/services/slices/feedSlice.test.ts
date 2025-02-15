import feedReducer, {
  fetchFeed,
  closeOrderModal,
  initialState
} from './feedSlice';
import { TOrder } from '../../utils/types';

describe('проверяем редьюсер feedSlice', () => {
  it('Загрузка полученных данных', () => {
    const action = { type: fetchFeed.pending.type };
    const nextState = feedReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Получение данных', () => {
    const mockFeedData = {
      orders: [
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
      ],
      total: 100,
      totalToday: 50
    };

    const action = { type: fetchFeed.fulfilled.type, payload: mockFeedData };
    const nextState = feedReducer(initialState, action);

    expect(nextState.orders).toEqual(mockFeedData.orders);
    expect(nextState.total).toEqual(mockFeedData.total);
    expect(nextState.totalToday).toEqual(mockFeedData.totalToday);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('Ошибка запроса на получение данных', () => {
    const errorMessage = 'Failed to fetch feed data';
    const action = { type: fetchFeed.rejected.type, payload: errorMessage };
    const nextState = feedReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('Закрытие модального окна', () => {
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
    const action = { type: closeOrderModal.type };
    const nextState = feedReducer(stateWithModalData, action);

    expect(nextState.orderModalData).toBeNull();
    expect(nextState.error).toBeNull();
  });
});
