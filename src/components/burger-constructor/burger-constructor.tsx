import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import {
  clearOrder,
  createOrder,
  getOrderModalData,
  getOrderRequest
} from '../../services/slices/burgerConstructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bun, ingredients: constructorIngredients } = useSelector(
    (state: RootState) => state.burgerConstructor.constructorItems
  );

  const constructorItems = {
    bun: bun,
    ingredients: [...constructorIngredients]
  };

  const orderRequest = useSelector(getOrderRequest);
  const Authenticated = useSelector((state) => state.user.isAuthenticated);
  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!Authenticated && constructorItems.bun) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;

    const order = [
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun?._id
    ].filter(Boolean);

    dispatch(createOrder(order));
    console.log(order);
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
