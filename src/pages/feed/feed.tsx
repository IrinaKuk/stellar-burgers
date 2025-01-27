import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.feed.loading);

  useEffect(() => {
    dispatch(fetchFeed()).then((result) => {});
  }, [dispatch]);

  const orders: TOrder[] = useSelector((state: RootState) => state.feed.orders);

  if (loading) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
