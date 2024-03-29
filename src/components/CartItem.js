import React from 'react';
import { ChevronDown, ChevronUp } from '../icons';
import { useDispatch } from 'react-redux';
import { decrease, increase, removeItem } from '../features/cartSlice';

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  const decreaseAmount = () => {
    if (amount === 1) {
      dispatch(removeItem({ id }));
    } else {
      dispatch(decrease({ id }));
    }
  };

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button
          className="remove-btn"
          onClick={() => dispatch(removeItem({ id }))}>
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(increase({ id }))}>
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={() => decreaseAmount()}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
