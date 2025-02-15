import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName: string | undefined = useSelector(
    (state: RootState) => state.user.user?.name
  );
  return <AppHeaderUI userName={userName ?? ''} />;
};
