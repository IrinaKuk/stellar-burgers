import ingredientsReducer, {
  fetchIngredients,
  initialState,
  setLoading,
  setError
} from './ingredientsSlice';

describe('проверяем редьюсер ingredientsSlice', () => {
  it('Обработка загрузки ингридиентов', () => {
    const action = { type: fetchIngredients.pending.type };
    const nextState = ingredientsReducer(initialState, action);
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Обработка успешной загрузки ингридиентов', () => {
    const mockIngredients = [
      {
        _id: '60d3b41abdacdf0026a73cfe',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '60d3b41abdacdf0026a73cff',
        name: 'Филе мианской мартышки',
        type: 'main',
        proteins: 42,
        fat: 14,
        carbohydrates: 24,
        calories: 26,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const nextState = ingredientsReducer(initialState, action);
    expect(nextState.ingredients).toEqual(mockIngredients);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('Обработка ошибки загрузки ингридиентов', () => {
    const errorMessage = 'Ошибка при загрузке ингридиентов';

    const action = {
      type: fetchIngredients.rejected.type,
      error: new Error(errorMessage)
    };
    const nextState = ingredientsReducer(initialState, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('Проверка присваивания загрузки', () => {
    const nextState = ingredientsReducer(initialState, setLoading(true));
    expect(nextState.loading).toBe(true);

    const nextStateFalse = ingredientsReducer(nextState, setLoading(false));
    expect(nextStateFalse.loading).toBe(false);
  });

  it('Проверка присваивания ошибки', () => {
    const errorMessage = 'Ошибка при загрузке ингридиентов';
    const nextState = ingredientsReducer(initialState, setError(errorMessage));
    expect(nextState.error).toBe(errorMessage);

    const nextStateNull = ingredientsReducer(nextState, setError(null));
    expect(nextStateNull.error).toBeNull();
  });
});
