import userReducer, {
  toRegisterUser,
  logInUser,
  logOutUser,
  userApi,
  updateUser,
  forgotPassword,
  resetPassword,
  setUser,
  clearError,
  setAuth,
  setAuthChecked,
  initialState
} from './userSlice';
import { TUser } from '../../utils/types';

describe('Тесты редьюсера userSlice', () => {
  it('Загрузка регистрации пользователя ', () => {
    const action = { type: toRegisterUser.pending.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Успешная регистрация пользователя', () => {
    const mockUser: TUser = { email: 'test@example.com', name: 'Test User' };
    const action = { type: toRegisterUser.fulfilled.type, payload: mockUser };
    const nextState = userReducer(initialState, action);

    expect(nextState.user).toEqual(mockUser);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Ошибка регистрации пользователя', () => {
    const errorMessage = 'Registration failed';
    const action = {
      type: toRegisterUser.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = userReducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('загрузка входа пользователя', () => {
    const action = { type: logInUser.pending.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.loginUserRequest).toBe(true);
    expect(nextState.loginUserError).toBeNull();
  });

  it('Успешный вход пользователя', () => {
    const mockUser: TUser = { email: 'test@example.com', name: 'Test User' };
    const action = { type: logInUser.fulfilled.type, payload: mockUser };
    const nextState = userReducer(initialState, action);

    expect(nextState.user).toEqual(mockUser);
    expect(nextState.loginUserRequest).toBe(false);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.loginUserError).toBeNull();
  });

  it('Ошибка при входе пользователя', () => {
    const errorMessage = 'Login failed';
    const action = {
      type: logInUser.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = userReducer(initialState, action);

    expect(nextState.loginUserRequest).toBe(false);
    expect(nextState.loginUserError).toBe(errorMessage);
  });

  it('Загрузка выхода пользователя', () => {
    const action = { type: logOutUser.pending.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Успешный выход пользователя', () => {
    const action = { type: logOutUser.fulfilled.type };
    const nextState = userReducer(
      {
        ...initialState,
        user: { email: 'test@example.com', name: 'Test User' },
        isAuthenticated: true
      },
      action
    );

    expect(nextState.user).toBeNull();
    expect(nextState.isAuthenticated).toBe(false);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('ошибка выхода пользователя', () => {
    const errorMessage = 'Logout failed';
    const action = {
      type: logOutUser.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = userReducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('заргузка данных пользователя', () => {
    const action = { type: userApi.pending.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('успешная загрузка данных пользователя', () => {
    const mockUser = { user: { email: 'test@example.com', name: 'Test User' } };
    const action = { type: userApi.fulfilled.type, payload: mockUser };
    const nextState = userReducer(initialState, action);

    expect(nextState.user).toEqual(mockUser.user);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.isAuthenticated).toBe(true);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('Ошибка загрузки данных пользователя', () => {
    const errorMessage = 'Failed to fetch user data';
    const action = {
      type: userApi.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = userReducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.error).toBe(errorMessage);
  });

  it('Загрузка обновления данных пользователя', () => {
    const action = { type: updateUser.pending.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Успешное обновление данных пользователя', () => {
    const mockUser = { user: { email: 'test@example.com', name: 'New Name' } };
    const action = { type: updateUser.fulfilled.type, payload: mockUser };
    const nextState = userReducer(initialState, action);

    expect(nextState.user).toEqual(mockUser.user);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Ошибка обновления данных пользователя', () => {
    const errorMessage = 'Failed to update user data';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = userReducer(initialState, action);

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
    expect(nextState.isAuthChecked).toBe(false);
  });

  it('Загрузка запроса на востановление пароля', () => {
    const action = { type: forgotPassword.pending.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Успешный запрос на востановление пароля', () => {
    const action = { type: forgotPassword.fulfilled.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('Ошибка востановления пароля', () => {
    const errorMessage = 'Forgot password failed';
    const action = {
      type: forgotPassword.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('Зрагрузка запроса на изменения пароля', () => {
    const action = { type: resetPassword.pending.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('Успешное изменение пароля', () => {
    const action = { type: resetPassword.fulfilled.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBeNull();
  });

  it('ошибка изменения пароля', () => {
    const errorMessage = 'Reset password failed';
    const action = {
      type: resetPassword.rejected.type,
      error: { message: errorMessage }
    };
    const nextState = userReducer(initialState, action);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(errorMessage);
  });

  it('Обносление информации о пользователе', () => {
    const mockUser: TUser = { email: 'test@example.com', name: 'Test User' };
    const action = { type: setUser.type, payload: mockUser };
    const nextState = userReducer(initialState, action);
    expect(nextState.user).toEqual(mockUser);
  });

  it('Очистка ошибок', () => {
    const stateWithError = { ...initialState, error: 'Some Error' };
    const action = { type: clearError.type };
    const nextState = userReducer(stateWithError, action);
    expect(nextState.error).toBeNull();
  });

  it('Обновление статуса аутентификации', () => {
    const action = { type: setAuth.type, payload: true };
    const nextState = userReducer(initialState, action);
    expect(nextState.isAuthenticated).toBe(true);
  });

  it('проверка статуса аутентификации', () => {
    const action = { type: setAuthChecked.type };
    const nextState = userReducer(initialState, action);
    expect(nextState.isAuthChecked).toBe(true);
  });
});
