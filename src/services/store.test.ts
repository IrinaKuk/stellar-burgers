import { rootReducer } from './store';
import { configureStore } from '@reduxjs/toolkit';

test('возврат начального состояния при передачи неизвестного action', () => {
  const action = { type: 'UNKNOWN_ACTION' };
  const expected = rootReducer(undefined, action);

  const store = configureStore({
    reducer: rootReducer
  });

  expect(expected).toEqual(store.getState());
});
