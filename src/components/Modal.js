import React from 'react';
import { clearCart } from '../features/cartSlice';
import { useDispatch } from 'react-redux';
import { closeModal } from '../features/modalSlice';

const Modal = () => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>remove all itme from your shopping cart?</h4>
        <div className="btn-container">
          <button
            className="btn confirm-btn"
            onClick={() => {
              handleCloseModal();
            }}>
            confirm
          </button>
          <button
            className="btn clear-btn"
            onClick={() => dispatch(closeModal())}>
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
