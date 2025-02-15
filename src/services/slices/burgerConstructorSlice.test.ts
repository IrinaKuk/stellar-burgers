import burgerConstructorReducer, {
  addItem,
  removeIngredient,
  moveIngredient,
  clearOrder
} from './burgerConstructorSlice';
import { v4 as uuidv4 } from 'uuid'; // Mock uuidv4
jest.mock('uuid');

describe('burgerConstructorSlice', () => {
  const initialState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: null
  };

  const mockUuid = 'mock-uuid';
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
  });

  afterEach(() => {
    (uuidv4 as jest.Mock).mockReset();
  });

  const ingredient1 = {
    id: '643d69a5c3f7b9001cfa0940',
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };

  const ingredient2 = {
    id: '643d69a5c3f7b9001cfa093f',
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
  };

  it('должен обрабатывать начальное состояние', () => {
    expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать добавление ингредиента (не булка)', () => {
    const expectedIngredient = { ...ingredient1, id: mockUuid };

    const nextStateIngredient = burgerConstructorReducer(
      initialState,
      addItem(ingredient1)
    );

    expect(nextStateIngredient.constructorItems.ingredients).toEqual([
      expectedIngredient
    ]);
    expect((uuidv4 as jest.Mock).mock.calls.length).toBe(1);
  });

  it('должен обрабатывать добавление булки', () => {
    const bun = {
      id: '643d69a5c3f7b9001cfa093c',
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };

    const expectedBun = { ...bun, id: mockUuid };

    const nextStateBun = burgerConstructorReducer(initialState, addItem(bun));

    expect(nextStateBun.constructorItems.bun).toEqual(expectedBun);
    expect((uuidv4 as jest.Mock).mock.calls.length).toBe(1);
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };
    const nextState = burgerConstructorReducer(
      stateWithIngredients,
      removeIngredient(0)
    );

    expect(nextState.constructorItems.ingredients).toEqual([ingredient2]);
  });

  it('должен обрабатывать перемещение ингредиента', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [ingredient1, ingredient2]
      }
    };

    const nextState = burgerConstructorReducer(
      stateWithIngredients,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(nextState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1
    ]);
  });
});
