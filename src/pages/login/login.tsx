import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { TRegisterData } from '@api';
import { logInUser } from '../../services/slices/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.isLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const User: Omit<TRegisterData, 'name'> = {
      email: email,
      password: password
    };
    dispatch(logInUser(User));
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
